# Etapa de desarrollo
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar el archivo de proyecto y restaurar dependencias
COPY *.csproj ./
RUN dotnet restore

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de desarrollo
ENV ASPNETCORE_URLS=http://0.0.0.0:5200
EXPOSE 5200

# Ejecutar en modo desarrollo con dotnet watch
ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5200"]

