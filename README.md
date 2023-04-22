# Gestionnaire d'exportation de clients CSV 

Ce projet est un kata en 5 étapes pour exporter des objets `Customer` au format CSV pour une intégration dans un système CRM.

## Scénario -  Kata n°1

Votre équipe vous a présenté une exigence urgente. Ils ont besoin de sauvegarder des objets `Customer`, conformément à la classe `Customer`, sur le disque au format CSV pour une tâche nocturne qui importe les données dans le système CRM pour les ventes. Les principales exigences sont les suivantes :

- Exporter les objets `Customer` au format CSV sans entêtes.
- Ne pas se soucier des virgules ou des guillemets dans les données.
- Ne pas vérifier l'existence de fichiers ou de données.
- Ne pas écrire sur le disque réel, utiliser une interface de fichier et un test double pour les tests unitaires.



## Scénario - Kata n°2

L'équipe d'administration système utilise votre générateur CSV, mais rencontre des problèmes lors de l'importation d'un gros fichier CSV unique. Le travail nocturne est bloqué et quelqu'un doit se lever à 2 heures du matin pour le redémarrer. Pour aider à résoudre ce problème, l'équipe a demandé que le générateur CSV soit modifié pour écrire des fichiers CSV par lots de 10. Par exemple, si le tableau de clients contient 12 enregistrements, deux fichiers seront écrits. Le premier avec 10 lignes et le second avec 2.

## Conseil

Lorsque vous modifiez le code pour permettre le traitement par lots, faites attention au principe d'ouverture/fermeture. Évitez d'utiliser des arguments par défaut dans les méthodes et réfléchissez à la meilleure façon d'ÉTENDRE la classe. Évitez de modifier les méthodes publiques existantes. À la place, étendez la classe en créant une surcharge ou une autre nouvelle méthode pour gérer la nouvelle exigence.

## Scénario - Kata n°3

L'équipe d'administration système a résolu le problème d'importation des gros fichiers et a maintenant besoin que le générateur CSV soit modifié pour créer des lots de 15 000 pour le travail nocturne.

## Conseil

Vous devez vous assurer que le système peut continuer à prendre en charge des lots de 10 en plus des lots de 15 000.