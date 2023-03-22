# Pasos para entender el codigo de la app 💪👊

## tecnologias usadas

- react
- electron
- typescript

react nos ayuda para hacer todo lo de la UI osea toda la interfaz grafica y funcionalidad de la aplicacion

electron nos sirve para darnos un entorno de aplicacion de escritorio usando tecnologias web

typescript es un lenguaje que nos da tipado de datos en javascript, osea poder colocarle tipos de datos como string, int etc, recordemos
que en js cualquier variable le podemos asignar cualquier tipo de dato y luego reasignarle otro tipo de dato

## Instalacion

```shell
git clone https://github.com/EmonterrosoF/paginacion-de-memoria.git

cd paginacion-de-memoria

npm i

# si quieren abrir el proyecto con vsCode
code .

# y luego que les habra vsCode, pueden abir una terminal adentro,
# y luego ejecutar el siguiente comando para arrancar la app
npm run dev

```

## entendiendo las rutas ⤵️⤵️⤵️⤵️

luego de que ya tenemos habierto vsCode entramos a la carpeta <b style='background: blue;'>src</b> y luego nos dirigimos al archivo <b style='background: blue;'>App.tsx</b> que es el principal donde se renderizan todos los componentes que hacen parte de la app

alli observamos los componentes

![app](/public/app.png)

podemos ver que los componentes son los que estan señalados

y cada uno de esos componentes se encuentran en la carpeta <b style='background: blue;'>components</b> cada uno en su propio archivo, dentro de cada uno esta comentado la funcionalidad que hace cada uno,
esos serian los archivos mas importantes en el proyecto
