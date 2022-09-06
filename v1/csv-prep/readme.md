## CSV prep

This tiny package is designed to help process large CSV files into an acceptable format for gridviz.  

For example:

Turning this...

``OBJECTID;ID;Cnt_ID;Ave_Total_Trav  ``   
``1;CRS3035RES1000mN1000000E1967000;3;49,121209420200000``

Into this...

``x,y,time ``  
``1967,1000,49``

## How to use

With node.js installed run ``npm install``

Then go to index.js and edit the code accordingly.

You will need to define:
- input file location
- output file location
- input file headers
- output file headers

Then run ``npm start``