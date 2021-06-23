FROM adoptopenjdk:8-jdk

COPY achat.jar /opt/
COPY application.yml /opt/
RUN mkdir opt/files
EXPOSE 8080
WORKDIR /opt
ENTRYPOINT [ "java" , "-jar", "/opt/achat.jar"]