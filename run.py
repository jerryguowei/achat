import subprocess
import os
import distutils.dir_util
import distutils.file_util

currentPath = os.path.dirname(os.path.abspath(__file__))
frontEndPath = os.path.join(currentPath, "front-end")
backEndPath = os.path.join(currentPath, "app")
dockerPath = os.path.join(currentPath, "docker")
subprocess.run("yarn install", cwd=frontEndPath, shell=True)
subprocess.run("yarn build", cwd=frontEndPath, shell=True)
print("start copy")
distutils.dir_util.copy_tree(os.path.join(frontEndPath, "build"), os.path.join(currentPath, "app/src/main/resources/static"))

subprocess.run("mvn clean package -Dmaven.test.skip=true", cwd=backEndPath, shell=True)
distutils.file_util.copy_file(os.path.join( backEndPath,"target", "achat-1.0.jar"), os.path.join(currentPath, "docker", "achat.jar"))
subprocess.run("docker build -t achat:1.0 .", cwd=dockerPath, shell=True)
subprocess.run("docker-compose up", cwd=dockerPath, shell=True)





