# Actu CEE : site public

**La plateforme unique qui regroupe les informations sur le dispositif CEE.**
Prix des certificats d'économies d'énergie (cotations du registre Emmy), primes pour les entreprises et les collectivités, fiches d'opérations standardisées, textes du Journal officiel, programmes, projet de loi de finances.

Adresse du site : **https://www.actucee.fr**

## Ce que contient ce dépôt

| Élément | Rôle |
| --- | --- |
| `docs/` | **Le site publié.** GitHub Pages met en ligne ce dossier, et lui seul. Il est produit par un générateur : on le remplace en bloc à chaque mise à jour, on ne le modifie pas page par page. |
| `documentation/` | Les guides pas à pas, avec leurs schémas : mise en ligne, nom de domaine, mise à jour, référencement, dépannage. |
| `README.md` | Cette notice. |

Le programme qui fabrique le site et les données qu'il utilise ne sont pas dans ce dépôt. Ils sont conservés à part, dans l'archive « sources ».

## Comment le site arrive en ligne

```
données de l'application  →  générateur  →  dossier docs/  →  GitHub Pages  →  www.actucee.fr
                             (archive « sources »)   (ce dépôt, branche main)
```

1. Le générateur produit un site statique : des pages HTML, une feuille de style, un script, deux images. Aucune base de données, aucun langage serveur.
2. Le dossier `docs/` est déposé dans ce dépôt, sur la branche `main`.
3. GitHub Pages le publie en une à deux minutes. Réglage : `Settings` › `Pages` › `Deploy from a branch`, branche `main`, dossier `/docs`.
4. Le nom de domaine `www.actucee.fr`, géré chez OVHcloud, pointe vers GitHub Pages. Les adresses `actucee.fr`, `www.actucee.com` et `actucee.com` y renvoient.

## Les guides

| Guide | Quand l'ouvrir |
| --- | --- |
| [1. Mettre le site en ligne sur GitHub](documentation/1-mettre-en-ligne-sur-github.md) | Une fois, au départ : compte, dépôt, dépôt des fichiers, publication. |
| [2. Relier le nom de domaine OVH](documentation/2-relier-le-nom-de-domaine-ovh.md) | Une fois, au départ : zone DNS, HTTPS, redirection du .com. |
| [3. Mettre à jour le site](documentation/3-mettre-a-jour-le-site.md) | À chaque cotation mensuelle du registre Emmy et à chaque texte CEE publié au Journal officiel. |
| [4. Mentions légales et référencement](documentation/4-mentions-legales-et-referencement.md) | Juste après la mise en ligne, puis pour le suivi. |
| [5. Dépannage](documentation/5-depannage.md) | Quand quelque chose ne se passe pas comme prévu. |

## Mettre à jour, en bref

1. Faire régénérer le site : on obtient un nouveau dossier `docs`.
2. Dans GitHub Desktop : « Fetch origin », puis « Pull origin » si le bouton apparaît.
3. Remplacer le dossier `docs` du dépôt par le nouveau.
4. « Commit to main », puis « Push origin ». Le site est à jour une à deux minutes plus tard.

## À ne pas supprimer

| Fichier | Pourquoi |
| --- | --- |
| `docs/CNAME` | Il porte le nom de domaine du site. Sans lui, le site ne répond plus sur www.actucee.fr. GitHub le crée quand on déclare le domaine. |
| `docs/.nojekyll` | Il demande à GitHub de publier les fichiers tels quels. |
| `docs/sitemap.xml`, `docs/robots.txt` | Ils indiquent aux moteurs de recherche les pages à lire. |
| `docs/404.html` | La page affichée quand une adresse n'existe pas. |

## À savoir sur GitHub Pages

- Avec un compte gratuit, GitHub Pages ne publie que depuis un dépôt public : tout ce que contient ce dépôt est lisible par tous.
- Un site est limité à 1 Go et à 100 Go de trafic par mois. Celui-ci pèse environ 5 Mo.
- GitHub n'autorise pas Pages comme hébergement gratuit d'une activité commerciale en ligne (boutique, logiciel vendu en service, site dont l'objet principal est de faciliter des transactions). Un site d'information entre dans le cadre.
- GitHub enregistre l'adresse IP des visiteurs dans ses journaux techniques. La page « Mentions légales » du site le signale.

Sources : [limites de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits), [présentation de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
