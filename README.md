# Capstone-project
Aplicación de escritorio que se usará para implementar un modelo de deserción universitaria realizado previamente.
## Pasos a realizar inicialmente
- instalar nodejs (lo cual instala también npm)
- instalar electron dentro de una carpeta a su elección (si a todo en la instalación), esto creará dentro la carpeta node_modules
- copiar el index.js que les enviaré dentro de la carpeta que crearon ustedes <- Supongo de aqui en adelante es pulled de github
- crear carpeta app, todo lo que hagamos por la aplicación se deberá hacer dentro de esta
- copiar el index.html ahí dentro
- bootstrap, etc, se instala en la carpeta raiz que creamos <- Intenta a ver si te sale sin hacer esto, aunque en vola si tengas que instalarlo

**Para iniciar la aplicación de escritorio mientras la desarrollamos: `npm run start`**

*Después le pregunto al fede como se hacer para compilar los ejecutables multiplataforma (aunque solo necesitemos para windows 10)*

## Tips de git solo por si se olvidaron de algo

Guia sencilla git:
http://rogerdudler.github.io/git-guide/index.es.html

### Para crear repo (lo creé yo)

git init
git add *
git commit -m "descripción"
git remote add origin https://github.com/dopazo/Capstone-project
git push -u origin master

### Para empezar
```
git init
git remote add origin https://github.com/dopazo/Capstone-project
```
### Siempre antes de empezar a trabajar, estar al día con el repo...
```git pull origin master```

### Para subir cambios
```git add *
git commit -m "descripcion"    // guiarse por https://la-guia.platan.us/tools/git
git push -u origin master
git checkout -b branch2        // crear nueva branch
git push origin branch2        // subir nueva branch
git checkout branchx           // moverse a x branch
git merge branchx              // desde branch master, hacer merge con branchx

git reset --hard origin/master //borrar lo hecho localmente, para volver a estar como el repo
```
