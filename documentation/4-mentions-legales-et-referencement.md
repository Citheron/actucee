# 4. Mentions légales et référencement

Trois choses à faire une fois le site visible sur www.actucee.fr.

## Étape 12 : compléter les mentions légales

La page « Mentions légales » nomme déjà l'hébergeur, GitHub. L'éditeur du site reste à renseigner : les mentions à compléter sont entre crochets.

Six informations sont attendues :

| Mention | Exemple de forme |
| --- | --- |
| Raison sociale ou nom de l'éditeur | Société X |
| Forme juridique et capital | SAS au capital de 10 000 € |
| Adresse du siège | numéro, rue, code postal, ville |
| Numéro d'immatriculation | RCS ou SIREN |
| Directeur de la publication | prénom et nom |
| Adresse de contact | une adresse électronique |

Elles se saisissent dans le fichier `generateur/site.json` de l'archive « sources », rubrique `editeur`. Le site est ensuite régénéré et déposé comme dans le [guide 3](3-mettre-a-jour-le-site.md). Une mention sans objet se note `-` : elle est alors omise.

En attendant une régénération, le fichier `docs/mentions-legales.html` peut être corrigé directement sur GitHub, avec l'icône en forme de crayon. Reportez tout de même les informations dans `site.json` : sans elles, la régénération suivante remettrait les crochets.

Ces mentions relèvent de vos obligations d'éditeur. En cas de doute sur ce qui est exigé dans votre situation, vérifiez auprès de votre conseil.

## Étape 13 : déclarer le site à Google et à Bing

1. Ouvrez [Google Search Console](https://search.google.com/search-console), ajoutez une propriété de type « Domaine » et saisissez `actucee.fr`. Google donne une entrée TXT à créer dans la zone DNS d'OVH, comme à l'étape 9 du [guide 2](2-relier-le-nom-de-domaine-ovh.md), sans sous-domaine.
2. Une fois la propriété validée, ouvrez « Sitemaps » et soumettez `https://www.actucee.fr/sitemap.xml`.
3. Ouvrez [Bing Webmaster Tools](https://www.bing.com/webmasters) et importez le site depuis Search Console.

## Ce qui est déjà en place dans le site

| Élément | Où |
| --- | --- |
| Une adresse, un titre et une description propres à chaque page | toutes les pages |
| Adresse de référence (balise canonique) en `https://www.actucee.fr/…` | toutes les pages |
| Plan de site daté | `docs/sitemap.xml` |
| Fichier pour les robots | `docs/robots.txt` |
| Données structurées : fil d'Ariane, jeu de données des prix, articles et textes législatifs, questions fréquentes | dans chaque page concernée |
| Page 404 | `docs/404.html` |
| Image de partage et logo | `docs/assets/partage.png`, `docs/assets/logo.png` |
| Une seule adresse référencée : actucee.fr, www.actucee.com et actucee.com renvoient vers www.actucee.fr | DNS et redirection OVH |

## Suivre le référencement

- Les premières impressions apparaissent dans Search Console après quatre à six semaines ; les requêtes disputées demandent plusieurs mois.
- Rapport « Pages » de Search Console : toutes les pages du plan de site doivent passer à l'état indexé, à l'exception des mentions légales et de la page 404, exclues volontairement.
- Rapport « Performances » : il donne les requêtes réelles. C'est avec lui que se vérifient et s'ajustent les priorités du plan de mots-clés, conservé dans l'archive « sources ».
- Un site mis à jour régulièrement est revisité plus souvent : tenez le rythme du [guide 3](3-mettre-a-jour-le-site.md).
- Quelques liens depuis des sites du secteur comptent davantage que beaucoup de pages. Les pages que les autres n'ont pas sont les meilleures candidates : tableau mensuel des prix, catalogue des fiches avec historique, liste des programmes.
