"use strict";
var          C=null,
    COLOR_BODY="#585858";

function Cuad()
{
 document.body.style.color=COLOR_BODY;
 this.div=document.getElementsByTagName("div")[0];
 this.p=this.div.getElementsByTagName("p");
 this.dimP=this.p.length;
 this.num=[];
 var    i=null,
        j=null,
        k=null,
     temp=null;

 for ( var n=0 ; n<this.dimP ; ++n ) {
     this.num.push(n);
     this.p[n].vec=[]; // Indices de los vecinos de this.p[n]
     // n = 4i + j. i:fila, j:columna
     j=n%4;
     i=Math.floor((n - j)/4.0 + 0.5);
     if ( (k=(i + 1))<4 )  this.p[n].vec.push(4*k + j);
     if ( (k=(j - 1))>=0 ) this.p[n].vec.push(4*i + k);
     if ( (k=(i - 1))>=0 ) this.p[n].vec.push(4*k + j);
     if ( (k=(j + 1))<4 )  this.p[n].vec.push(4*i + k);
 }

 this.barajar();
 this.div.className="absoluta";
 this.div.onmouseup=this.jugar();
 return this; 
}

Cuad.prototype.barajar=function ()
{
 var conDesorden=(function () { return 0.5 - Math.random(); }),
            este=this,
               n=null;
     
 (function ()
  {
   este.num.sort(conDesorden);
 
   for ( n=0 ; n<este.dimP ; ++n ) {
       este.p[n].style.backgroundColor
       =( este.num[n]!=0 ) ? este.color():COLOR_BODY;

       este.p[n].innerHTML=este.num[n];
   }
  })();
};


Cuad.prototype.color=(function ()
{
 var      b=null,
       coma=(new String(",")),
          g=null,
       parD=(new String(")")),
          r=null,
     rgbPar=(new String("rgb("));

 return function ()
 {
  r=128 + Math.floor(Math.random()*128.0);
  g=128 + Math.floor(Math.random()*128.0);
  b=128 + Math.floor(Math.random()*128.0);
  return rgbPar + r + coma + g + coma + b + parD;
 };
})();


Cuad.prototype.jugar=function ()
{
 var  dim=null,
     este=this,
        n=null,
        p=null,
        t=null;

 return function (evento)
 {
  if ( !evento ) evento=window.event;
  if ( !(t=evento.target) ) return;
  if ( t.nodeName.toLowerCase()!="p" ) return;
  dim=t.vec.length;
  for ( n=0 ; n<dim ; ++n ) {
      p=este.p[t.vec[n]];
      if ( p.innerHTML!="0" ) continue;
      p.innerHTML=t.innerHTML;
      p.style.backgroundColor=este.color();
      t.style.backgroundColor=COLOR_BODY;
      t.innerHTML="0";
  }

  if ( este.yaGano() ) {
     este.div.onmouseup=null;
     este.div.style.backgroundColor="#eee";
  }
 };
};


Cuad.prototype.yaGano=function ()
{
 for ( var n=0 ; n<this.dimP ; ++n ) {
     if ( parseInt(this.p[n].innerHTML,10)!=n ) return false;
 }

 return true;
};

window.onload=function () { C=new Cuad(); };
