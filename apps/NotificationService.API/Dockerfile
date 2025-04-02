FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . .

ENV ASPNETCORE_URLS=http://0.0.0.0:5071
EXPOSE 5071

ENTRYPOINT ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5071"]

