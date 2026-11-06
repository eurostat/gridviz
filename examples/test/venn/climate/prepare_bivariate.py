"""Prepare the data of the bivariate climate map (bivariate.html).

Input: the WorldClim 2.1 bioclimatic variables at 10 arc-minutes (about 12 to 18 km in Europe), 1970-2000 (CC-BY 4.0),
https://geodata.ucdavis.edu/climate/worldclim/2_1/base/wc2.1_10m_bio.zip . Extract it, and give the folder as argument:
    python prepare_bivariate.py <folder with the wc2.1_10m_bio_*.tif files>
The variables are resampled (bilinear) to 5 km cells in EPSG:3035, on the same grid and for the same countries as prepare.py.
Output: one CSV file of 10 km cells, in this folder, bivariate_10000.csv: x, y, and the means over the land of the cell of
the annual mean temperature in C (t) and of the annual precipitation in mm (p). It prints the limits of the 5 classes of each
variable (quintiles of the cells), which are in bivariate.html.
Needs numpy and rasterio.
"""
import json, os, sys, urllib.request
import numpy as np
import rasterio
from rasterio.features import rasterize
from rasterio.transform import from_origin
from rasterio.warp import reproject, Resampling

#the variables: column, WorldClim variable and decimals
VARIABLES = {"t": (1, 1), "p": (12, 0)}
#the resolution to produce, in m (not 5 km: it would be finer than the data)
RESOLUTION = 10000
#the grid of the resampling: the extent of Europe in EPSG:3035
LEFT, TOP, RES, W, H = 2500000, 5500000, 5000, 980, 820
#the countries of the map, from the Nuts2json countries
COUNTRIES = "AL AT BA BE BG CH CY CZ DE DK EE EL ES FI FR HR HU IE IS IT LI LT LU LV ME MK MT NL NO PL PT RO RS SE SI SK TR UA UK MD".split()
URL = "https://raw.githubusercontent.com/eurostat/Nuts2json/master/pub/v2/2024/3035/20M/cntrg.json"

folder = sys.argv[1]
dst_transform = from_origin(LEFT, TOP, RES, RES)
with urllib.request.urlopen(URL) as u:
    features = [f for f in json.load(u)["features"] if f["properties"]["id"] in COUNTRIES]
land = rasterize([(f["geometry"], 1) for f in features], out_shape=(H, W), transform=dst_transform, all_touched=True, dtype="uint8")

values = {}
for key, (n, _) in VARIABLES.items():
    with rasterio.open(os.path.join(folder, "wc2.1_10m_bio_%d.tif" % n)) as s:
        src = s.read(1).astype(np.float32)
        src[src < -1e30] = np.nan
        dst = np.full((H, W), np.nan, dtype=np.float32)
        reproject(src, dst, src_transform=s.transform, src_crs=s.crs, src_nodata=np.nan,
                  dst_transform=dst_transform, dst_crs="EPSG:3035", dst_nodata=np.nan, resampling=Resampling.bilinear)
    dst[land == 0] = np.nan
    values[key] = dst

#a pixel counts only if it has both values
valid = np.isfinite(values["t"]) & np.isfinite(values["p"])
r = RESOLUTION
k = r // RES
h, w = H - H % k, W - W % k
count = valid[:h, :w].reshape(h // k, k, w // k, k).sum(axis=(1, 3))
means = {}
for key in VARIABLES:
    v = np.where(valid, values[key], 0)[:h, :w].reshape(h // k, k, w // k, k).sum(axis=(1, 3))
    means[key] = np.divide(v, count, out=np.zeros_like(v), where=count > 0)
rows = []
#the row i is the cell of lower left corner y = TOP - (i + 1) * r
for i, j in zip(*np.nonzero(count)):
    rows.append((int(LEFT + j * r), int(TOP - (i + 1) * r), round(float(means["t"][i, j]), VARIABLES["t"][1]), int(round(float(means["p"][i, j])))))
rows.sort()
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "bivariate_%d.csv" % r), "w", newline="") as o:
    o.write("x,y,t,p\n")
    o.writelines(",".join(map(str, row)) + "\n" for row in rows)
print(r, len(rows), "cells")
ok = count > 0
for key in VARIABLES:
    print(key, "limits", [round(float(q), 1) for q in np.quantile(means[key][ok], [0.2, 0.4, 0.6, 0.8])],
          "range", round(float(means[key][ok].min()), 1), round(float(means[key][ok].max()), 1))
