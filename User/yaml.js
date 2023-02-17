//Swagger
//@GET All Users 
/**
 * @swagger
 * 
 *  components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  headers:
 *    Authorization:
 *      description: Access token
 *      required: true
 *      schema:
 *        type: string
 * paths:
 *  /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Login Required
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       "200":
 *         description: GET All Users Successfully
 *       "400":
 *         description: Something went wrong when trying to GET Users
 *  
 */
//@DELETE USER
/**
 * @swagger
 * 
 *  components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  headers:
 *    Authorization:
 *      description: Access token
 *      required: true
 *      schema:
 *        type: string
 * 
 * paths:
 *  /user/{userId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Login Required
 *     security:
 *        - bearerAuth: []
 *     produces:
 *     - "application/json"  
 *     operationId: deleteUserById
 *     parameters:
 *       - name: userId
 *         in: path
 *     responses:
 *       "200":
 *         description: DELETE User Successfully
 *       "400":
 *         description: Something went wrong when trying to DELETE User
 *  
 */
//@PUT USER
/**
 * @swagger
 * 
 *  components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  headers:
 *    Authorization:
 *      description: Access token
 *      required: true
 *      schema:
 *        type: string
 * 
 * paths:
 *  /user:
 *   put:
 *     tags:
 *       - User
 *     summary: User Can Only Update His Informations
 *     security:
 *        - bearerAuth: [] 
 *     requestBody:
 *        description: User Can Only Update His Informations
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: ""
 *                role:
 *                  type: string
 *                  example: ""
 *     responses:
 *       "200":
 *         description: Update User Successfully
 *       "400":
 *         description: UPDATE User Has Failed
 *  
 */
//@PUT Deposit
/**
 * @swagger
 * 
 *  components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  headers:
 *    Authorization:
 *      description: Access token
 *      required: true
 *      schema:
 *        type: string
 * paths:
 *  /user/deposit:
 *   put:
 *     tags:
 *       - User
 *     summary: User Can Only Change his Deposit amount
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deposit:
 *                 type: number
 *       description: User deposit information
 *       required: true
 *     responses:
 *       "201":
 *         description: Successfully add deposit
 *       "400":
 *         description: Bad request
 * 
 * */
//@PUT Reset Deposit
/**
 * @swagger
 * 
 *  components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  headers:
 *    Authorization:
 *      description: Access token
 *      required: true
 *      schema:
 *        type: string
 * paths:
 *  /user/deposit/reset:
 *   put:
 *     tags:
 *       - User
 *     summary: User Can Only Reset his Deposit  
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Reset Deposit Successfully
 *       "400":
 *         description: Reset the Deposit  Has Failed
 * 
 * */
