"""Prepare the data of the air pollution Venn map (index.html).

Input: the annual 2023 maps of PM2.5, NO2 and O3 at 1 km, in EPSG:3035 (Open Earth Monitor, CC-BY 4.0,
https://zenodo.org/records/19566932, files COGs_pm2p5_1km_annual_eu_v20250306.zip, COGs_no2_1km_annual_eu_v20250306.zip and
COGs_o3_1km_annual_eu_v20250306.zip). Extract the 2023 tif of each, and give their folder as argument:
    python prepare.py <folder with the three tif files>
Output: one CSV file per resolution, in this folder: x, y, and the area in km2 (the number of 1 km pixels) above the threshold
of PM2.5 (p), NO2 (n) and O3 (o).
Needs numpy and rasterio.
"""
import glob, sys, os
import numpy as np
import rasterio

#the thresholds, in micrograms per m3
THRESHOLDS = {"p": ("pm2.5_", 10), "n": ("no2_", 10), "o": ("o3_", 120)}
#the resolutions to produce, in m
RESOLUTIONS = [5000, 10000, 20000, 50000]

folder = sys.argv[1]
exceed = {}
for key, (prefix, t) in THRESHOLDS.items():
    f = glob.glob(os.path.join(folder, "air_quality." + prefix + "*20230101*.tif"))[0]
    with rasterio.open(f) as s:
        a = s.read(1)
        left, top, res = s.bounds.left, s.bounds.top, s.transform.a
    assert res == 1000
    #nodata (NaN) is not above the threshold
    exceed[key] = (a > t).astype(np.int32)
bottom = top - exceed["p"].shape[0] * res

for r in RESOLUTIONS:
    k = r // 1000
    h, w = exceed["p"].shape
    h, w = h - h % k, w - w % k
    sums = {key: e[:h, :w].reshape(h // k, k, w // k, k).sum(axis=(1, 3)) for key, e in exceed.items()}
    rows = []
    #rows are from the top: the row i of the sums is the cell of lower left corner y = top - (i + 1) * r
    for i, j in zip(*np.nonzero(sums["p"] + sums["n"] + sums["o"])):
        rows.append((int(left + j * r), int(top - (i + 1) * r), int(sums["p"][i, j]), int(sums["n"][i, j]), int(sums["o"][i, j])))
    rows.sort()
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), str(r) + ".csv"), "w", newline="") as o:
        o.write("x,y,p,n,o\n")
        o.writelines(",".join(map(str, row)) + "\n" for row in rows)
    print(r, len(rows), "cells")
