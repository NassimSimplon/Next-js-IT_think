//Swagger
//@GET 
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
 *  /product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Login Required
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       "200":
 *         description: GET All products Successfully
 *       "400":
 *         description: GET All products Has Failed 
 *  
 */
//@Add Product
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
 *  /product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Only Users With Role Seller Can Add Product
 *     security:
 *        - bearerAuth: [] 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productName:
 *                  type: string 
 *                amountAvailable:
 *                  type: number
 *                cost:
 *                  type: number
  
 *     responses:
 *       "200":
 *         description: POST Product Successfully
 *       "400":
 *         description: Failed to Save Product
 *  
 */
//@DELETE
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
 *  /product/{productID}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Only the Owner of the Product can delete The Product
 *     security:
 *        - bearerAuth: []
 *     produces:
 *     - "application/json"  
 *     operationId: deleteProductById
 *     parameters:
 *       - name: productID
 *         in: path
 *     responses:
 *       "200":
 *         description: DELETE User Successfully
 *       "400":
 *         description: Something went wrong when trying to DELETE User
 *  
 */
//@PUT Product
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
 *  /product/{productID}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Only the Owner of the Product Can Update the Product
 *     security:
 *        - bearerAuth: []
 *     produces:
 *     - "application/json"  
 *     operationId: UpdateProductById
 *     parameters:
 *       - name: productID
 *         in: path 
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productName:
 *                  type: string
 *                cost:
 *                  type: number
 *                amountAvailable:
 *                  type: number
 *     responses:
 *       "200":
 *         description: Update User Successfully
 *       "400":
 *         description: UPDATE User Has Failed
 *  
 */
//@Buy Product
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
 *  /product/buy/{productID}/{amountOfProducts}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Only Users With Role Buyer can Buy Products
 *     security:
 *        - bearerAuth: []
 *     produces:
 *     - "application/json"  
 *     operationId: Buy Product
 *     parameters:
 *       - name: productID
 *         in: path 
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: amountOfProducts
 *         in: path 
 *         description: amountOfProducts
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: Buying Product Successfully
 *       "400":
 *         description: Buying Product Failure
 *  
 *  
 */