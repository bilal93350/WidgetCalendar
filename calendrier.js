var jours = new Array(
	"LUN",
	"MAR",
	"MER",
	"JEU",
	"VEN",
	"SAM",
	"DIM"
	);

var moisAnnée = [1,1970];



var docMoisAnnée = document.getElementById('label');
var nbLignes = 6;


document.getElementById('next').addEventListener('click',function (){

	if(moisAnnée[0]==11){
		moisAnnée[0] =  (moisAnnée[0]+1)%12;
		moisAnnée[1] += 1 ;
	}else {
		moisAnnée[0] += 1;  

	}

	
	docMoisAnnée.innerHTML = mois[moisAnnée[0]] + " " + moisAnnée[1] ;



	// init matrice
	var matrice = créerMatrice(); 
	
	// remplissage

	placerValeursMatrice(matrice,moisAnnée[0],moisAnnée[1]);

	// remplacement

	remplacer(matrice,41);

})

document.getElementById('prev').addEventListener('click',function (){

	if(moisAnnée[0]==0){
		moisAnnée[0] =  (moisAnnée[0]+11);
		moisAnnée[1] -= 1 ;
	}else {
		moisAnnée[0] -= 1;  

	}

	
	docMoisAnnée.innerHTML = mois[moisAnnée[0]] + " " + moisAnnée[1] ;



	// init matrice
	var matrice = créerMatrice(); 
	
	// remplissage

	placerValeursMatrice(matrice,moisAnnée[0],moisAnnée[1]);

	// remplacement

	remplacer(matrice,41);

})

document.getElementById('label').addEventListener('click',dateActuelle)

var mois = new Array(
	"janvier", 
	"fevrier", 
	"mars", 
	"avril", 
	"mai", 
	"juin", 
	"juillet", 
	"aout", 
	"septembre", 
	"octobre", 
	"novembre", 
	"decembre");

function getNbJoursDansMois(année,mois){
	var date = new Date(année,mois+1,0) // mettre 0 au jour indique le jour précédent --> récup nb jours
	// Date :  1 - 28/29/30/31
	var v = date.getDate();
	return v;
}

function créerMatrice(){
	var matrice =new Array();
	
	for(var nbL = 0 ; nbL<nbLignes ; ++nbL){
		matrice[nbL] = new Array();
		for(var j=0;j<jours.length;++j){
			matrice[nbL][j] = "n";

		}

	}
	return matrice;

}

function placerValeursMatrice(matrice, moisA, annéeA){

	var usefulDate = new Date(annéeA,moisA); // 1er du mois
	
	var jourU = (usefulDate.getDay()+6)%7; // on convertis Dim - Lun a Lun - Dim

	var nbJours = getNbJoursDansMois(annéeA,moisA);

	var joursPlacé = 1;

	//remplissage avec vals
	for(var nbL = 0 ; nbL<nbLignes ; ++nbL){
		if (nbL==0) {
			for (var tmp = jourU; tmp<jours.length;++tmp) {
				matrice[nbL][tmp] = joursPlacé++;

			}
		} else {

			if(joursPlacé > nbJours){
				break;
			}
			for (var tmp = 0; tmp<jours.length;++tmp) {
				matrice[nbL][tmp] = joursPlacé++;

				if(joursPlacé > nbJours){
					break;
				}
			}	
		}
	}
}

function remplacer(matrice,numA){
		var L = [];
	for(var nbL = 0 ; nbL<nbLignes ; ++nbL){
		L[nbL] = "";
		for (var tmp = 0; tmp<jours.length;++tmp) {
			if (matrice[nbL][tmp] == "n"){
				L[nbL] += "<td class=\"null\"></td>";
				
			}else{
				if(matrice[nbL][tmp] == numA){
					L[nbL] += "<td class=\"today\">"+ matrice[nbL][tmp]+"</td>";
				}else{
					L[nbL] += "<td>"+ matrice[nbL][tmp]+"</td>";
				}
			}
			
					
		}
	}

	for (var nbL = 0 ; nbL<nbLignes ; ++nbL) {
		var li = document.getElementById("L"+nbL);
		li.innerHTML = L[nbL];
	}
}

function dateActuelle(){
	var dateA = new Date();
	var annéeA = dateA.getFullYear(); // année
	var moisA = dateA.getMonth(); // 0-11 Jan - Dec
	var numA = dateA.getDate();
	docMoisAnnée.innerHTML = mois[moisA] + " " + annéeA;
	moisAnnée[0] = moisA;
	moisAnnée[1] = annéeA;



	// init matrice
	var matrice = créerMatrice(); 
	
	// remplissage

	placerValeursMatrice(matrice,moisA,annéeA);

	// remplacement

	remplacer(matrice,numA);

}





dateActuelle();