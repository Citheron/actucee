# 5. Dépannage

Les numéros d'étape renvoient aux guides [1](1-mettre-en-ligne-sur-github.md) et [2](2-relier-le-nom-de-domaine-ovh.md).

## Sur GitHub

| Ce que vous voyez | Cause probable | Quoi faire |
| --- | --- | --- |
| L'adresse provisoire affiche le texte de la notice, ou une erreur 404 | GitHub Pages ne publie pas le bon dossier | `Settings` › `Pages` : branche « main », dossier « /docs », puis « Save » (étape 6) |
| Rien n'est publié cinq minutes après « Save » | La publication a échoué | Onglet « Actions » : sur la ligne « pages build and deployment » en erreur, bouton « Re-run jobs » |
| GitHub Desktop demande « Pull origin » avant d'envoyer | Le dépôt en ligne contient un changement que votre copie n'a pas, par exemple le fichier `CNAME` créé à l'étape 8 | « Pull origin », puis de nouveau « Push origin » |
| Le site a perdu son nom de domaine après une mise à jour | Le fichier `docs/CNAME` a disparu | Refaire l'étape 8 : GitHub le recrée. Vérifier que le nouveau dossier `docs` contient bien `CNAME` |
| Une page ajoutée n'apparaît pas | Publication en cours, ou cache du navigateur | Onglet « Actions » : attendre la coche verte, puis recharger la page sans le cache |

## Nom de domaine et HTTPS

| Ce que vous voyez | Cause probable | Quoi faire |
| --- | --- | --- |
| www.actucee.fr affiche encore la page d'attente d'OVH | Propagation en cours, ou une des six entrées à supprimer est restée | Attendre jusqu'à 24 heures ; relire la zone DNS avec les tableaux de l'étape 9 |
| Le contrôle DNS de GitHub échoue | Entrée manquante ou mal saisie | Vérifier les quatre entrées A, et le CNAME de `www` : cible `VOTRE-COMPTE.github.io.` avec le point final |
| « Verify » échoue sur actucee.fr | Entrée TXT de vérification mal nommée | Dans OVH, le sous-domaine est `_github-pages-challenge-VOTRE-COMPTE`, sans `.actucee.fr` à la fin |
| La case « Enforce HTTPS » reste indisponible | Le certificat n'est pas encore délivré | Attendre jusqu'à 24 heures. Ensuite : « Remove » dans « Custom domain », ressaisir www.actucee.fr, « Save » |
| Le navigateur signale un site non sécurisé | « Enforce HTTPS » n'est pas coché, ou le certificat est en cours | Cocher la case dès qu'elle est disponible |
| actucee.com ne renvoie pas vers le site | Redirection OVH pas encore propagée, ou adresse saisie en https:// | Attendre 4 à 24 heures ; essayer avec `http://actucee.com` (étape 11) |

## Messagerie

| Ce que vous voyez | Cause probable | Quoi faire |
| --- | --- | --- |
| Les e-mails n'arrivent plus | Une ligne MX a été supprimée | La recréer : type MX, sous-domaine vide, `mx1.mail.ovh.net.` priorité 1, `mx2.mail.ovh.net.` priorité 5, `mx3.mail.ovh.net.` priorité 100 |
| Les e-mails envoyés partent en indésirables | La ligne TXT « v=spf1 » a été supprimée | La recréer : type TXT, sous-domaine vide, valeur `v=spf1 include:mx.ovh.com -all` |

## Revenir en arrière chez OVH

Dans la zone DNS, ouvrez « Actions sur ma zone », puis « Voir l'historique de ma zone DNS » : OVH y conserve les versions précédentes, et chacune peut être restaurée.

## Vérifier la zone DNS sans attendre

L'outil en ligne [Google Admin Toolbox, Dig](https://toolbox.googleapps.com/apps/dig/) interroge les serveurs DNS publics :

| Nom à saisir | Type | Réponse attendue |
| --- | --- | --- |
| `actucee.fr` | A | les quatre adresses 185.199.108.153 à 185.199.111.153 |
| `www.actucee.fr` | CNAME | `VOTRE-COMPTE.github.io.` |
| `_github-pages-challenge-VOTRE-COMPTE.actucee.fr` | TXT | le code donné par GitHub |
| `actucee.fr` | MX | les trois serveurs `mx1`, `mx2`, `mx3.mail.ovh.net.` |

Sources : GitHub Docs, [nom de domaine personnalisé](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) et [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) ; OVHcloud, [éditer une zone DNS](https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-zone-edit), [historique d'une zone DNS](https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-zone-history) et [rediriger un nom de domaine](https://docs.ovhcloud.com/fr/guides/web-cloud/domains/redirect-domain-name).
