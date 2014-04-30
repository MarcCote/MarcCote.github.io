# -*- coding: utf-8 -*-

#####
# VotreNom (VotreMatricule) .~= À MODIFIER =~.
###

from pdb import set_trace as dbg  # Utiliser dbg() pour faire un break dans votre code.

import numpy as np


#
# AEtoileTuple : Classe représentant un tuple de TaquinEtat, score f et d'un parent AEtoileTuple.
#
class AEtoileTuple:

    def __init__(self, etat, f, parent=None):
        self.etat = etat
        self.f = f
        self.parent = parent

    # Fonction de comparaison entre deux AEtoileTuple (i.e. <, >, <=, >= ).
    def __cmp__(self, autre):
        return cmp(self.f, autre.f)

    # Fonction d'équivalence entre deux AEtoileTuple (i.e. == ).
    def __eq__(self, autre):
        return self.etat == autre.etat


#
# joueur_taquin : Fonction qui calcule le chemin, suite d'états, optimal afin de complété
#                  le puzzle.
#
# etat_depart: Objet de la classe TaquinEtat indiquant l'état initial du jeu.
#
# fct_estEtatFinal: Fonction qui prend en entrée un objet de la classe TaquinEtat et
#                   qui vérifie si l'état passée en paramêtre est l'état final ou non.
#
# fct_transitions: Fonction qui prend en entrée un objet de la classe TaquinEtat et
#                   qui retourne la listes des états voisins pour l'état donné.
#
# fct_heuristique: Fonction qui prend en entrée un objet de la classe TaquinEtat et
#                   qui retourne le coût heuristique pour se rendre à l'état final.
#
# retour: Cette fonction retourne la liste des états de la solution triés en ordre chronologique
#          c'est-à-dire de l'état initial jusqu'à l'état final inclusivement.
#
def joueur_taquin(etat_depart, fct_estEtatFinal, fct_transitions, fct_heuristique):

    # TODO: Implémenter une recherche A*

    # Retourne une liste vide d'états (à modifier)
    return []
