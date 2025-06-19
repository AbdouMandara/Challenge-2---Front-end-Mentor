function affiche_ajouter(elem, qte,plus, qtite, moins,nom,prix,img_thumbnail) {
   
    /*Déclaration des variables */
    const panier_vide = document.querySelector(".panier-vide")
    const panier_avec_items = document.querySelector(".panier-avec-items")
    /*---------------------------- */
    
    elem.addEventListener("click", ()=>{
        /*Elle va servir à afficher les div à l'écran */
            function afficher_la_div_à_l_écran(param) {
                param.classList.add("affiche")
            }
        /*Elle va servir à rétirer les div à l'écran */
            function retire_la_div_à_l_écran(param) {
                param.classList.remove("affiche")
                param.style.display="none"
            }


        /*---Sert à ajouter le produit sur lequel j'ai cliqué sur "Add to Cart"  au niveau de mon panier---*/
            let section_cart = `<section class="element-du-panier"><div class="description-element"><p class="titre-element">${nom}</p><div class="info-element"><span id="nombre-commandé">1x</span><span class="prix-element">@$${prix.toFixed(2)}</span><p class="prix-fois-nombre">$${prix.toFixed(2)}</p></div></div><svg class="supprimer-element" alt="supprimer un élement" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></section>`
            panier_avec_items.insertAdjacentHTML("afterbegin", section_cart)
       
            /*--Déclaration des variables pour les nbrers d'articles, les prix, les prix * nbre d'articles et le btn pour enlever un élement du panier-- */
            const nombre_commandé = document.querySelector("#nombre-commandé")
            const prix_fois_nombre = document.querySelector(".prix-fois-nombre")
            const supprimer_element = document.querySelector(".supprimer-element")
            let qte_total = document.querySelector(".qte-total") //où je vais injecter la somme de la quantité commandé au niveau de <<order Total>>

        /*--- Gestion d'apparition et de disparition de certaines div */
            afficher_la_div_à_l_écran(qte) // pour afficher la div où on choisit la quantité
            afficher_la_div_à_l_écran(panier_avec_items)
            retire_la_div_à_l_écran(panier_vide)

        /*Pour la bordure sur l'image */
            let div_image = elem.previousElementSibling
            div_image.style.border="2px solid var(--Red)"
            /*__________________________________ */
  
        /*------Pour génerer dynamiquement les produits lors des achats pour la confirmation ---*/
            const tes_commandes_avec_thumbnails = document.querySelector(".tes-commandes-avec-thumbnails")
            let section_de_confirmation = ` <section class="description-commande"><svg class="supprimer-produit" alt="supprimer un élement" xmlns="http://www.w3.org/2000/svg" width="0" height="0" fill="none" viewBox="0 0 10 10"><path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg><img src="${img_thumbnail}" alt=""><div class="info-element"><p class="titre-element">${nom}</p><div class="details-nombre"><span id="nombre-commandé-commande"></span><span class="prix-element-commande">@$${prix.toFixed(2)}</span></div></div><p class="prix-fois-nombre-commande"></p></section>`
            tes_commandes_avec_thumbnails.insertAdjacentHTML("afterbegin", section_de_confirmation)

        /*--Déclaration des variables pour les nbrers d'articles, les prix * nbre d'articles  dans la div qui apparaitra quand tu cliques sur le CTA dans (your cart)-- */
             const prix_fois_nombre_commande = document.querySelector(".prix-fois-nombre-commande")
             const nombre_commandé_commande = document.querySelector("#nombre-commandé-commande")

        /*--Je donne aux elements qui apparaitront quand je cliques sur le CTA le même contenu que les produits dans (your cart)*/
              nombre_commandé_commande.innerHTML= nombre_commandé.innerHTML
              prix_fois_nombre_commande.innerHTML= prix_fois_nombre.innerHTML
        
          /*--------Incrémentation de la quantité----------- */
        let nbre = 1
        plus.addEventListener("click", ()=>{
            nbre++
                /*----J'incremente le nombre dans la div <<qte>> ----*/
                qtite.innerHTML=`${nbre}`
                /*----J'incremente le nombre de commande, il est visible en bas du nom du produit ---- */
                nombre_commandé.innerHTML= `${nbre}x`
                /*--J'incremente le nombre de commande et je le multiplies avec le prix du produit, il est visible en bas du nom du produit ---- */
                prix_fois_nombre.innerHTML= `$${prix*nbre.toFixed(2)}`
                
                /*--Je donne aux elements qui apparaitront quand je cliques sur le CTA le meme contenu que les produits dans (your cart) quand je vais incrementer leur valeur -----*/
                nombre_commandé_commande.innerHTML= nombre_commandé.innerHTML
                prix_fois_nombre_commande.innerHTML= prix_fois_nombre.innerHTML
        })
        /*------------------------------------------------ */
        
        /*---------Decrémentation de la quantité----------- */
        moins.addEventListener('click', ()=>{
            /*--Pour que tu ne puisses plus cliquer sur le btn "moins" quand le nbre de commande =1  */
            if (nbre<=1) {
                moins.removeEventListener("click")
            }
            nbre--
            /*--J'decremente le nombre dans la div <<qte>> */
            qtite.innerHTML=`${nbre}`
            /*--J'decremente le nombre de commande, il est visible en bas du nom du produit ---- */
            nombre_commandé.innerHTML= `${nbre}x`
            /*--J'decremente le nombre de commande et je le multiplies avec le prix du produit, il est visible en bas du nom du produit ---- */
            prix_fois_nombre.innerHTML= `$${prix*nbre.toFixed(2)}`       
            /*--Je donne aux elements qui apparaitront quand je cliques sur le CTA le meme contenu que les produits dans (your cart) quand je vais decrementer leur valeur -----*/
            nombre_commandé_commande.innerHTML= nombre_commandé.innerHTML
            prix_fois_nombre_commande.innerHTML= prix_fois_nombre.innerHTML   
        })
        /*------------------------------------------------ */
        
        // il va me servir à supprimer dans la partie où on confirme le produit en question  que j'ai supprimé dans your cart  
        const supprimer_produit = document.querySelector(".supprimer-produit")
       
        /*------------Pour supprimer un produit du panier------------- */
        supprimer_element.addEventListener('click', (suppr_event)=>{
            /* -- Quand je cliques sur la croix dans la div "panier-avec-items"  çà va retirer du DOM le parent de la croix sur laquelle j'ai cliqué*/
            const parent_supprimer_element = supprimer_element.parentElement
            const parent_supprimer_produit = supprimer_produit.parentElement
                parent_supprimer_element.remove()
                parent_supprimer_produit.remove()
 
            /*--J'enlève la bordure à l'element du produit en question--- */
            div_image.style.border="2px solid transparent"
            /*---Je retire la div qte au niveau de son affichage et je lui remet comme nombre au nivceau de la quantité 1---- */
                retire_la_div_à_l_écran(qte) //C'est la div où on choisit la quantité
                nbre = 1
                qtite.innerHTML=`${nbre}` //c'est la quantité qu'on réinitialise à 1
            /*--------------------------------------------------------------------------- */
            
                /*___pour afficher le panier vide s'il y a aucun produit ajouter car s'il y a un produit ajouter au panier (cart) son nombre d'enfants va augmenter or par défaut il a 3 d'où la condition___*/
                    if ( panier_avec_items.children.length === 3) {
                        panier_vide.style.display="flex"
                        retire_la_div_à_l_écran(panier_avec_items)
                        qte_total.innerHTML= 0 //Je mets dans les parenthèses du grand titre <<Your Cart>> la valeur 0
                    }
                    /*------------------------------------------- */
    })
            
             
         /*---------------------------------------------------------------- */

        /*-----Pour afficher la section "confirm-commande" quand je clique sur le CTA <<Btn de confirmation>>---*/
        const btn_de_confirmation = document.querySelector("#btn-de-confirmation")
        const confirme_commande = document.querySelector("#confirme-commande")
        
        btn_de_confirmation.addEventListener("click",()=>{
            afficher_la_div_à_l_écran(confirme_commande)
            document.body.style.overflowY="hidden"
        })
        /*------------------------------------------------- */
})
}

/*--- Comme j'ai utilisé un module localement alors çà refuse celà d'où j'ai deplacé mon code ici. Nb : Apprendre à utiliser des modules avec WampServer */

/*------------------------Je vais recuperer à partir d'ici certaines infos----------------------------*/
const infos = [
    {
       "image": {
            "thumbnail": "../assets/images/image-waffle-thumbnail.jpg",
            "mobile": "../assets/images/image-waffle-mobile.jpg",
            "tablet": "../assets/images/image-waffle-tablet.jpg",
            "desktop": "../assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "../assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "../assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "../assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "../assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-macaron-thumbnail.jpg",
            "mobile": "../assets/images/image-macaron-mobile.jpg",
            "tablet": "../assets/images/image-macaron-tablet.jpg",
            "desktop": "../assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "../assets/images/image-tiramisu-mobile.jpg",
            "tablet": "../assets/images/image-tiramisu-tablet.jpg",
            "desktop": "../assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-baklava-thumbnail.jpg",
            "mobile": "../assets/images/image-baklava-mobile.jpg",
            "tablet": "../assets/images/image-baklava-tablet.jpg",
            "desktop": "../assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-meringue-thumbnail.jpg",
            "mobile": "../assets/images/image-meringue-mobile.jpg",
            "tablet": "../assets/images/image-meringue-tablet.jpg",
            "desktop": "../assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-cake-thumbnail.jpg",
            "mobile": "../assets/images/image-cake-mobile.jpg",
            "tablet": "../assets/images/image-cake-tablet.jpg",
            "desktop": "../assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-brownie-thumbnail.jpg",
            "mobile": "../assets/images/image-brownie-mobile.jpg",
            "tablet": "../assets/images/image-brownie-tablet.jpg",
            "desktop": "../assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "../assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "../assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "../assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "../assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]
/*--Pour les thumbnails des produits achetés qui apparaitront dans la div "order-confirmed" ----------*/
const img_thumbnail_0 = infos[0].image.thumbnail
const img_thumbnail_1 = infos[1].image.thumbnail
const img_thumbnail_2 = infos[2].image.thumbnail
const img_thumbnail_3 = infos[3].image.thumbnail
const img_thumbnail_4 = infos[4].image.thumbnail
const img_thumbnail_5 = infos[5].image.thumbnail
const img_thumbnail_6 = infos[6].image.thumbnail
const img_thumbnail_7 = infos[7].image.thumbnail
const img_thumbnail_8 = infos[8].image.thumbnail
/*--------------------------------------------- */

/*---Les noms des produits ----*/
const nom_0 = infos[0].name
const nom_1 = infos[1].name
const nom_2 = infos[2].name
const nom_3 = infos[3].name
const nom_4 = infos[4].name
const nom_5 = infos[5].name
const nom_6 = infos[6].name
const nom_7 = infos[7].name
const nom_8 = infos[8].name
/*----------------- */

/*---Les noms des produits */
const prix_0 = infos[0].price
const prix_1 = infos[1].price
const prix_2 = infos[2].price
const prix_3 = infos[3].price
const prix_4 = infos[4].price
const prix_5 = infos[5].price
const prix_6 = infos[6].price
const prix_7 = infos[7].price
const prix_8 = infos[8].price
/*----------------- */

// Mes differentes div "ajouter" qui vont me servir à ajouter un produit au panier{cart}
const ajouter_0 = document.getElementById("ajouter-0")
const ajouter_1 = document.getElementById("ajouter-1")
const ajouter_2 = document.getElementById("ajouter-2")
const ajouter_3 = document.getElementById("ajouter-3")
const ajouter_4 = document.getElementById("ajouter-4")
const ajouter_5 = document.getElementById("ajouter-5")
const ajouter_6 = document.getElementById("ajouter-6")
const ajouter_7 = document.getElementById("ajouter-7")
const ajouter_8 = document.getElementById("ajouter-8")
/*----------------------------------------------------*/

// Mes div quantités qui serviront à changer la quantité et qui apparaitra quand j'aurai cliqué sur ajouter
const qte_0 = document.getElementById("qte-0")
const qte_1 = document.getElementById("qte-1")
const qte_2 = document.getElementById("qte-2")
const qte_3 = document.getElementById("qte-3")
const qte_4 = document.getElementById("qte-4")
const qte_5 = document.getElementById("qte-5")
const qte_6 = document.getElementById("qte-6")
const qte_7 = document.getElementById("qte-7")
const qte_8 = document.getElementById("qte-8")
/*----------------------------------------------------*/

// Mes div pour le nombre çà peut etre incrementer ou decrementer
const qtite_0 = document.getElementById("qtite-0")
const qtite_1 = document.getElementById("qtite-1")
const qtite_2 = document.getElementById("qtite-2")
const qtite_3 = document.getElementById("qtite-3")
const qtite_4 = document.getElementById("qtite-4")
const qtite_5 = document.getElementById("qtite-5")
const qtite_6 = document.getElementById("qtite-6")
const qtite_7 = document.getElementById("qtite-7")
const qtite_8 = document.getElementById("qtite-8")
/*----------------------------------------------------*/

// Mes div pour incrementer
const plus_0 = document.getElementById("plus-0")
const plus_1 = document.getElementById("plus-1")
const plus_2 = document.getElementById("plus-2")
const plus_3 = document.getElementById("plus-3")
const plus_4 = document.getElementById("plus-4")
const plus_5 = document.getElementById("plus-5")
const plus_6 = document.getElementById("plus-6")
const plus_7 = document.getElementById("plus-7")
const plus_8 = document.getElementById("plus-8")
/*----------------------------------------------------*/

// Mes div pour decrementer
const moins_0 = document.getElementById("moins-0")
const moins_1 = document.getElementById("moins-1")
const moins_2 = document.getElementById("moins-2")
const moins_3 = document.getElementById("moins-3")
const moins_4 = document.getElementById("moins-4")
const moins_5 = document.getElementById("moins-5")
const moins_6 = document.getElementById("moins-6")
const moins_7 = document.getElementById("moins-7")
const moins_8 = document.getElementById("moins-8")
/*----------------------------------------------------*/

// affichons la div en  fait çà fait toutes les interactions à 90%
affiche_ajouter(ajouter_0, qte_0,plus_0, qtite_0,moins_0,nom_0,prix_0,img_thumbnail_0)
affiche_ajouter(ajouter_1, qte_1,plus_1, qtite_1,moins_1,nom_1,prix_1,img_thumbnail_1)
affiche_ajouter(ajouter_2, qte_2,plus_2, qtite_2,moins_2,nom_2,prix_2,img_thumbnail_2)
affiche_ajouter(ajouter_3, qte_3,plus_3, qtite_3,moins_3,nom_3,prix_3,img_thumbnail_3)
affiche_ajouter(ajouter_4, qte_4,plus_4, qtite_4,moins_4,nom_4,prix_4,img_thumbnail_4)
affiche_ajouter(ajouter_5, qte_5,plus_5, qtite_5,moins_5,nom_5,prix_5,img_thumbnail_5)
affiche_ajouter(ajouter_6, qte_6,plus_6, qtite_6,moins_6,nom_6,prix_6,img_thumbnail_6)
affiche_ajouter(ajouter_7, qte_7,plus_7, qtite_7,moins_7,nom_7,prix_7,img_thumbnail_7)
affiche_ajouter(ajouter_8, qte_8,plus_8, qtite_8,moins_8,nom_8,prix_8,img_thumbnail_8)
/*_______________________________________ */

/**Cette partie sert à recuperer le texte injecté dans les sapn "prix-fois-nombre"  ensuite tu retires le "$" grace à <<Substring(indice de départ)>> qui sert à créer une autre chaine, ensuites le convertir en tableau et faire la somme des diff résultats obtenus du contenu dans ces spans et les ajouter à "montant-total" grace au set-interval c'est à temps réel [NB : c'est risqué au niveau de la mémoire 😒😑🤣Lol !]
 */
window.addEventListener("click", ()=>{
            setInterval(() => {
                    const panier_avec_items = document.querySelector(".panier-avec-items")    
                    let montant_total = document.querySelector(".montant-total")  //où je vais injecter la somme de le montant total des produits commandés
                    let montant_total_commande = document.querySelector(".montant-total-commande")  //où je vais injecter la somme de le montant total des produits commandés dans la div de confirmation
                    if (panier_avec_items.childElementCount >= 4) {
                            let array_total=[]
                            document.querySelectorAll(".prix-fois-nombre").forEach((commande)=>{
                                    let commande_en_char = commande.textContent 
                                    commande_en_char = commande_en_char.substring(1)
                                    let commande_en_number = parseFloat(commande_en_char)
                                    array_total.push(commande_en_number)
                                    let somme = array_total.reduce((acc, nbre)=>{
                                        return acc + nbre
                                    },0)
                                    montant_total.innerHTML=`$${somme.toFixed(2)}`
                                    montant_total_commande.innerHTML=`$${somme.toFixed(2)}`
                            }) 

                            /*--En fait c'est pour ce qui s'affiche dans (Your Cart) */
                            let array_total_qte =[]
                            document.querySelectorAll("#nombre-commandé").forEach((nbre)=>{
                                   let qte_total = document.querySelector(".qte-total") //où je vais injecter la somme de la quantité commandé
                                    let  nbre_en_char = nbre.textContent 
                                    let nbre_en_number = parseInt(nbre_en_char)
                                    array_total_qte.push(nbre_en_number)
                                    let somme_des_nbres_de_produits_commandés = array_total_qte.reduce((acci, produit)=>{
                                        return acci + produit
                                    },0)
                                    qte_total.innerHTML=`${somme_des_nbres_de_produits_commandés}`
                            })
                    }
                }, 150);
})
/*--Fermeture de la div "order-confirmed" en cliquant sur "ESC" ----- */
const confirme_commande = document.querySelector("#confirme-commande")
document.addEventListener("keydown",(e)=>{
    if (e.key==="Escape") {
        confirme_commande.classList.remove("affiche")
        document.body.style.overflowY="visible"
    }
})
/*-- Quan je cliques sur "start new order" çà me permet de refaire un nouvel achat en fait çà me faire recharger la page gràce à <<location.reload()>> */
const  btn_de_nouvelle_commande = document.querySelector("#btn-de-nouvelle-commande")
btn_de_nouvelle_commande.addEventListener("click", (e)=>{
    location.reload()
})
