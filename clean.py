import subprocess
import os

currentPath = os.path.dirname(os.path.abspath(__file__))
dockerPath = os.path.join(currentPath, "docker")

subprocess.run("docker-compose down -v", cwd=dockerPath, shell=True)