#--CVEN9421--Transportation Problem

set Supply;
set Demand;

param S{Supply};
param D{Demand};
param c{Supply,Demand};

var [...];

minimize cost: [...];

subject to [...];