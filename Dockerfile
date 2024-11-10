FROM alpine:latest AS build

RUN apk add git openjdk21

RUN git clone https://github.com/slivkiteam/FitHub.git
WORKDIR /FitHub/FitHubBackend
RUN chmod +x gradlew && ./gradlew bootJar

FROM alpine:latest AS result
RUN apk add openjdk21
WORKDIR /app
COPY --from=build /FitHub/FitHubBackend/build/libs/FitHub-*.jar ./service.jar
COPY application-dec.yaml .

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "service.jar"]
CMD ["--spring.config.location=classpath:/application.properties,file:application-dec.yaml"]