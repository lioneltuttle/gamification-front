export enum BadgeType {
    R2 = 'R2', 
    PROP = 'PROP', 
    FINANCE = 'FINANCE', 
    ECOLE_FR = 'ECOLE FR', 
    DEMARRAGE_SANS_IC = 'DEMARRAGE SANS IC', 
    DEMARRAGE_2_SEMAINES = 'DEMARRAGE SOUS 2 SEMAINES'
  }

export class Resultat {

  id:number;
  userId:number;
  categorie:BadgeType;
  points:number;
  nbBadges:number;
}