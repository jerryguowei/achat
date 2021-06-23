import subprocess
import os
import distutils.dir_util
import distutils.file_util

currentPath = os.path.dirname(__file__)
frontEndPath = os.path.join(currentPath, "front-end")
backEndPath = os.path.join(currentPath, "app")
dockerPath = os.path.join(currentPath, "docker")
os.chdir(frontEndPath)
process = subprocess.Popen("yarn install",shell=True)
process.wait()
process = subprocess.Popen("yarn build",shell=True)
process.wait()
print("finish")
distutils.dir_util.copy_tree("./build", "../app/src/main/resources/static")

os.chdir(backEndPath)
process = subprocess.Popen("mvn clean package -Dmaven.test.skip=true", shell=True)
process.wait()

distutils.file_util.copy_file("./target/achat-1.0.jar", os.path.join(currentPath, "docker", "achat.jar"))

os.chdir(dockerPath)

process = subprocess.Popen("docker build -t achat:1.0 .", shell=True)
process.wait()



