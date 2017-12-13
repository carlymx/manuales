
# SERVIDOR TERRARIA EN ORANGE PI

## Instalación del SERVIDOR

1. Crear un nuevo Usuario:

		adduser terraria

2. Instalar programas 'Mono, Screen y unZip':

		sudo apt-get install mono-complete screen zip unzip

3. Usar Usuario nuevo:

		su terraria

4. Ir al directorio 'Home':

		cd ~ (la bilirgülilla en terminal linux sale con F5) 

5. Descargar la última versión de del servidor TShock en [link](https://github.com/NyxStudios/TShock/releases/)
Por ejemplo:

		wget https://github.com/Pryaxis/TShock/releases/download/v4.3.25/tshock_4.3.25.zip

6. Descomprimir en un nuevo directorio el contenido del zip:

		unzip tshock_4.3.25.zip -d ./server

7. Iniciar por primera vez el Servidor y crear un mapa:

		mono-sgen TerrariaServer.exe
		(despúes cerrar el servidor con el comando)
		exit

8. Crear un archivo de texto ejecutable del tipo ".sh"

		touch Iniciar_Server.sh && chmod +x Iniciar_Server.sh

9. Editar el archivo e incluir las instrucciones de arranque de nuestro servidor:

		sudo nano Iniciar_Server.sh

		#!/bin/bash
		screen -S server -A -m \
			mono-sgen TerrariaServer.exe \
			-world "/home/terraria/.local/share/Terraria/Worlds/mundo1.wld" \

			
10. Luego solo queda iniciar el servidor accediendo al archivo desde cualquier lugar:

		./Iniciar_Server.sh


Eso es todo.



## Notas Adicionales:

- **Copiar mundo desde Windows hacia Linux usando PSCP.exe (Herramienta de Putty)**

  - Descargar PSCP.exe [x32](https://the.earth.li/~sgtatham/putty/latest/w32/pscp.exe) [x64](https://the.earth.li/~sgtatham/putty/latest/w64/pscp.exe)
  - Copiar pscp.exe a C:\WIndows\system32\
  - Iniciar PowerShell

		'pscp 'C:\Coop.wld' root@192.168.0.114:/home/terraria/.local/share/Terraria/Worlds'

- **Comando de Servidor**

		-maxplayers 8
		-port 7778


- **Ubicaciones de los mundos según sistemas**

	**En WIndows:** "C:\Users\your name\Documents\My Games\terraria\Worlds"
	
	**En Mac:** "~/Library/Application Support/terraria/Worlds"
	
	**En Linux:** "~/.local/share/Terraria/Worlds"



- **Fuentes de datos**

	Manual TShock: https://tshock.readme.io/v4.3.22/docs/config-settings
	
	Usando GNU SCREEN: https://phenobarbital.wordpress.com/2013/02/18/linux-usando-gnu-screen/
	
	Ubicaciones de archivos: http://www.jugonestop.com/pregunta/9371/donde-estan-mis-archivos-de-mundo
	
	Montar TShock en Linux: https://tshock.co/xf/index.php?threads/guide-how-to-host-tshock-on-linux.4798/



..