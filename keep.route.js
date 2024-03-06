
//Swagger Documentation
/**
 * @swagger
 * /api/data/mes-donnees:
 * get:
 *      summary: get all data test
 *   
 */
//Defining Routes
dataRoute.get(
    '/compteurs',
    dataController.GetAllData
);

//Swagger Documentation
/**
 * @swagger
 * /api/data/mes-donnees:
 * get:
 *      summary: get all data test
 *   
 */
//Defining Routes
dataRoute.get(
    '/compteurs/live',
    dataController.GetAllDataLive
);



dataRoute.post(
    '/compteurs/Shelly3emOhs2305',
    dataController.Shelly3emOhs2305
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2304',
    dataController.Shelly3emOhs2304
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2303',
    dataController.Shelly3emOhs2303
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2302',
    dataController.Shelly3emOhs2302
);
dataRoute.post(
    '/compteurs/Shelly3emOhs2301',
    dataController.Shelly3emOhs2301
);
dataRoute.post(
    '/compteurs/EBZDD3',
    dataController.EBZDD3
);
dataRoute.post(
    '/compteurs/ITRON',
    dataController.ITRON
);




/**
 * @swagger
 * /api/data/hauptzaehler2:
 *  get:
 *      tags:
 *          - ShellyModel
 *      summary: this endpoint is to take information concerning a hauptzaehler.
 *      description: prendre les donnees d'un compteur
 *      requestBody:
 *          required: true
 *          content:
 *              applicaton/json
 *      responses:
 *          200:
 *              description: Les donnees pris avec success
 *   
 */
dataRoute.get(
    '/hauptzaehler2',
    dataController.rufHauptzaehler
);


/**
 * @swagger
 * /api/data/hauptzaehler3:
 *  put:
 *      tags:
 *          - ShellyModel
 *      summary: this endpoint is to take information concerning a hauptzaehler.
 *      description: prendre les donnees d'un compteur
 *      requestBody:
 *          required: true
 *          content:
 *              applicaton/json
 *      responses:
 *          200:
 *              description: Les donnees pris avec success
 *   
 */
dataRoute.put(
    '/hauptzaehler3',
    dataController.rufHauptzaehler
);


/**
 * @swagger
 * /api/data/hauptzaehler4:
 *  delete:
 *      tags:
 *          - ShellyModel
 *      summary: this endpoint is to take information concerning a hauptzaehler.
 *      description: prendre les donnees d'un compteur
 *      requestBody:
 *          required: true
 *          content:
 *              applicaton/json
 *      responses:
 *          200:
 *              description: Les donnees pris avec success
 *   
 */
dataRoute.delete(
    '/hauptzaehler4',
    dataController.rufHauptzaehler
);