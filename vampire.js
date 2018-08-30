class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberAwayFromOriginal = 0;
    let currentCreator = this;
    while(currentCreator.creator){
      currentCreator = currentCreator.creator;
      numberAwayFromOriginal++;
    }
    return numberAwayFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  parentsToRoot(){
    let thisParents = [];
    let currentNode = this;
    thisParents.push(currentNode);
    while(currentNode.creator){
      currentNode = currentNode.creator;
      thisParents.push(currentNode);
    }
    return thisParents;
  }

  closestCommonAncestor(vampire) {
    let thisParents = this.parentsToRoot().reverse();
    let vampireParents = vampire.parentsToRoot().reverse();
    let minLength = Math.min(thisParents.length, vampireParents.length);

    let closestParent;
    let i = 0;
    while (i < minLength) {
      if(thisParents[i] === vampireParents[i]){
        closestParent = thisParents[i];
      }
      i++;
    }

    return closestParent;

  }
}

module.exports = Vampire;

