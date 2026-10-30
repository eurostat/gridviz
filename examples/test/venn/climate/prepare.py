"""Prepare the data of the climate Venn map (index.html).

Input: the WorldClim 2.1 bioclimatic variables at 10 arc-minutes (about 12 to 18 km in Europe), 1970-2000 (CC-BY 4.0),
https://geodata.ucdavis.edu/climate/worldclim/2_1/base/wc2.1_10m_bio.zip . Extract it, and give the folder as argument:
    python prepare.py <folder with the wc2.1_10m_bio_*.tif files>
The variables are resampled (bilinear) to 5 km cells in EPSG:3035, then the thresholds are applied.
Output: one CSV file per resolution, in this folder: x, y, and the area in km2 where the summers are hot (h), the winters are cold (c)
and the precipitation is high (w).
The cells are limited to the countries of the map (the Nuts2json countries).
Needs numpy and rasterio.
"""
import json, os, sys, urllib.request
import numpy as np
import rasterio
from rasterio.features import rasterize
from rasterio.transform import from_origin
from rasterio.warp import reproject, Resampling

#the variables: column, WorldClim variable, comparison and threshold
#h: mean temperature of the warmest quarter above 20 C. c: mean temperature of the coldest quarter below 0 C. w: annual precipitation above 1000 mm
VARIABLES = {"h": (10, 1, 20), "c": (11, -1, 0), "w": (12, 1, 1000)}
#the resolutions to produce, in m (not 5 km: it would be finer than the data)
RESOLUTIONS = [10000, 20000, 50000]
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
flags = {}
for key, (n, sign, t) in VARIABLES.items():
    with rasterio.open(os.path.join(folder, "wc2.1_10m_bio_%d.tif" % n)) as s:
        src = s.read(1).astype(np.float32)
        src[src < -1e30] = np.nan
        dst = np.full((H, W), np.nan, dtype=np.float32)
        reproject(src, dst, src_transform=s.transform, src_crs=s.crs, src_nodata=np.nan,
                  dst_transform=dst_transform, dst_crs="EPSG:3035", dst_nodata=np.nan, resampling=Resampling.bilinear)
    #no data (sea) is not above or below a threshold
    flags[key] = ((dst > t) if sign > 0 else (dst < t)).astype(np.int32) * land * (RES // 1000) ** 2

for r in RESOLUTIONS:
    k = r // RES
    h, w = H - H % k, W - W % k
    sums = {key: f[:h, :w].reshape(h // k, k, w // k, k).sum(axis=(1, 3)) for key, f in flags.items()}
    rows = []
    #the row i is the cell of lower left corner y = TOP - (i + 1) * r
    for i, j in zip(*np.nonzero(sums["h"] + sums["c"] + sums["w"])):
        rows.append((int(LEFT + j * r), int(TOP - (i + 1) * r), int(sums["h"][i, j]), int(sums["c"][i, j]), int(sums["w"][i, j])))
    rows.sort()
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), str(r) + ".csv"), "w", newline="") as o:
        o.write("x,y,h,c,w\n")
        o.writelines(",".join(map(str, row)) + "\n" for row in rows)
    print(r, len(rows), "cells")
