/**
 * @swagger
 *  /auth/register:
 *  post:
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "myusername"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *               role:
 *                 type: string
 *       description: User registration information
 *       required: true
 *     responses:
 *       "201":
 *         description: Successfully created new user
 *       "400":
 *         description: Bad request
 * 
 *     
 * /auth/login:
 *   post:
 *     tags: 
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "myusername"
 *               password:
 *                 type: string
 *                 example: "mypassword"
 *       description: User login information
 *       required: true
 *     responses:
 *       "200":
 *         description: Successfully logged in
 *       "400":
 *         description: Unauthorized
 *
 */

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
 *  /auth/logout:
 *   put:
 *     tags:
 *       - Auth
 *     summary: Login Required
 *     security:
 *        - bearerAuth: []
 *     produces:
 *     - "application/json"  
 *     responses:
 *       "200":
 *         description: Log Out Successfully
 *       "400":
 *         description: Log Out Failed !!
 *  
 */

/**
 * @swagger
 * 
 * 
 * paths:
 *  /auth/logout/all:
 *   put:
 *     tags:
 *       - Auth
 *     summary: Enter UserName and Password to LogOut All
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "myusername"
 *               password:
 *                 type: string
 *                 example: "mypassword" 
 *     responses:
 *       "200":
 *         description: Log Out Successfully
 *       "400":
 *         description: Log Out Failed !!
 *  
 */