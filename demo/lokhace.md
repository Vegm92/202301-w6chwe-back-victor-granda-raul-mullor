# SetUp

Se va probando paso a paso que todo hace lo esperado

- instalar express
- poner scripts para lanzar tsc y dist
- iniciar servidor
- comprueba que recibe req y responde server
- instalar morgan y poner formato "dev"
- instala chalk -> configura el server listening para ponerle un color
- instala debug y sus types
- instala dotenv. importar y usar su metodo config (recuerda extraer dotenv.config a otro archivo para asegurarse de que se ejecuta el archivo)

Debug -> const debug = createDebug("nombreAplicación:server:StartServer")
metemos variable DEBUG=nombreAplicación:
y comprobamos que funciona.

para comprobar el flujo del startserver desde fuera.
Añade PORT en .env
try - catcheamos(error:unkown) - si hay error mostrar (error as Error).message
anular el no implicit cohersión

# Carpeta controllers

- crea controller con req y res de epress -> si llega algo hasta devuelve status y json que queramos

# Gestión de errores

## errorMiddleware

- generalError -> status(500).json({error: "ha petat"})
  llevar al index de server
- notfoundError -> next(new Error())

- Crea class CustomError extends Errord -> donde se le da al constructor message, public statusCode y publicMessage. llama al super del padre

cambiamos generalError para traer error: CustomError
y le asiga en el cuerpo de general error variables que recogen
error.statusCode || 500
error.publicMessage || "ha petat tot"

actualizar el next(new CustomError)

# Base de datos

- instalar mongoose
- crea base de datos / collection
- traer url de mongoose al .env finaliza /nombreColección
- connectDataBase(url) -> mongoose.set, return mongoose.connect(url)
- en src index, tiene k haber un try catch donde se recoja conected to database y server list
- poner mongo.set("debug", true) para que muestre por consola si habla con la base de datos. y nos dejará ver lo que contiene la query.
  - aqui veremos que se ha creado un indice único. SI POR ALGÚN MOTIVO QUITAMOS UNIQUE DE NUESTRO SCHEMA, TENEMOS QUE REVISAR QUE EN DATABASE TMB SE QUITE.

## models

- schema ->
  const gossetSchema = new schema{
  name: {type: String, required: true},
  color: {type: String, required: true}}
  chip: {type: String, required: true, unique: true}
  const Gosset = model("Gosset", gossetSchema,)
-
- crear debajo de overrides naming-convention : "off"

## controller gossets

- crea getGosset -> await gosset.find(); y consolea

## Routers

- gossetsRouter = Router();
- gossetsRouter

## en gossetsControllers

- crea createGossets ->
- Requiere de interface GossetData (con lo necesario que le dimos en el schema) que creamos en types
- Anula rule consistent typ definitions :off
- createGossets = async (req: Request<{}, {}, GossetData>, res: Response) =>
- para que el const gossetData = req.body no vuelva undefine debemos poner express.json() en el index.
- para crear gossets en la base de datos debemos poner Gosset.create(gossetData)
- Llevar al router gossetsRouter.post("/afegir", createGosset);

- crear gosset en postman: metodo post
- /afegir -> en el body : {"name": "Cala", "chip": "123456" etc...}
- En getGossets, cambiar el console.log por un res.status(200).json( { gossets })

- para evitar crear el mismo perro dos veces o con la misma chip/id -> añadir en createGossets un catch(error)
- ponerun new CustomError((error as Error).message, 409, "Chip repetido")

# Para proteger ambos endpoints por JSONWEBTOKEN

## Crear el checkeo del token

- Crea una colleción de users en la base de datos -> username, password, email...
- JWT.IO -> en payloaddata- sub sera la \_id, name : username
- en verify signature pondremos un hash que tendremos que guardar en local

- en get gossets -> if(!req.header("Authorization")) {
  const customError = new CustomError("missing token")
  next(customError)
  return
  }

- luego -> req.header("Authorization")?.replace(/^Bearer\s\*/, "") //para coger unicamente el token

- Para comprobar la validez del token -> install jsonwebtoken y su types
- import jwt from jsonwebtoken
- const payload = jwt.verify(token, process.env.palabraSecreta) // que se guardará en .env
- importar loadEnvironment.js

## Para enseñar solo los gossets de un user

### entidad user

- userSchema -> username, password, y email (todo con type y required)
- const User = model("User", userSchema, "users"),
- actualizar el schema de gosset para añadir owner:
  {
  type: Schema.Types.ObjectId,
  ref: "User"}
- en mongodb para añadir un owner de gosset se le pasa el id del user al owner del perro, pero como ObjectId y no string
- deconstruir ownerId en const payload = jwt.verify(token, process.env.palabraSecreta) -> const { sub: ownerId } = jwt.verify(token, process.env.palabraSecreta)

### comprobar si viene autorización y verificar

- hacer un middleware que se llama auth.ts
- const auth = (req: Request, res: Response, next: NextFunction)
- nos traemos toda la gestion creada hasta ahora
- try catcheamos la respuesta de
- en el router,en index general ponemos el auth -> app.use("/", auth, gossetsRouter) // Subcadena de middlewares

- en el header de la request nos viene la id del usuario. para sacarla podremos y poder usarla :
  - crea interface de customRequest que extiende de request, dandole ownerId !!! Ojo que se ael Request de Express
    crea interface de customJwtPayload

## Crear Endpoint Token

### en router -> usersRouters

- usersRouter = Router();
- metodo post -> usersRouter.post("/", )

### crear usersControllers

- const loginUser = (req: Request<{}, {}, userCredentials>, res: Response)
- crear interface de userCredentials -> username, password.
- const {username, password } = req.body;
- const user = await User.findOne({username, password}),
- control de undefines: añadir next: NextFunction
  - if (!user) {const customError = new CustomError("Wrong Credentials", 401, "Wrong credentials")}
  - next(customError) return
- const jwtpayload = { sub: user.\_id}
  jwt.sign(jwtPayload, process.env.JWT_SECRET!, expiresIn: "2d",))
  res.status(200).json({ token })
