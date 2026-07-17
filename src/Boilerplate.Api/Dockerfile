# ============================================================
# STAGE 1 - Build Angular
# ============================================================
FROM node:22-alpine AS angular-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build --configuration production

# ============================================================
# STAGE 2 - Build .NET
# ============================================================
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build

WORKDIR /src

COPY Directory.Packages.props ./

COPY src/Boilerplate.Api/Boilerplate.Api.csproj src/Boilerplate.Api/
COPY src/Boilerplate.Application/Boilerplate.Application.csproj src/Boilerplate.Application/
COPY src/Boilerplate.Domain/Boilerplate.Domain.csproj src/Boilerplate.Domain/
COPY src/Boilerplate.Infrastructure/Boilerplate.Infrastructure.csproj src/Boilerplate.Infrastructure/

RUN dotnet restore src/Boilerplate.Api/Boilerplate.Api.csproj

COPY . .

WORKDIR /src/src/Boilerplate.Api

RUN dotnet publish Boilerplate.Api.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

# ============================================================
# STAGE 3 - Runtime
# ============================================================
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS final

WORKDIR /app

RUN apk add --no-cache icu-libs

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

COPY --from=build /app/publish .

# Copy Angular build into wwwroot
COPY --from=angular-build /frontend/dist/frontend/browser ./wwwroot

EXPOSE 8080

ENTRYPOINT ["dotnet","Boilerplate.Api.dll"]

# ##See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
# #
# FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS base
# WORKDIR /app
# EXPOSE 8080

# # Install cultures (same approach as Alpine SDK image)
# RUN apk add --no-cache icu-libs

# # Disable the invariant mode (set in base image)
# ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
# WORKDIR /src
# COPY ["./Directory.Packages.props", "./"]
# COPY ["src/Boilerplate.Api/Boilerplate.Api.csproj", "src/Boilerplate.Api/"]
# COPY ["src/Boilerplate.Application/Boilerplate.Application.csproj", "src/Boilerplate.Application/"]
# COPY ["src/Boilerplate.Domain/Boilerplate.Domain.csproj", "src/Boilerplate.Domain/"]
# COPY ["src/Boilerplate.Infrastructure/Boilerplate.Infrastructure.csproj", "src/Boilerplate.Infrastructure/"]
# COPY . .
# WORKDIR "/src/src/Boilerplate.Api"

# FROM build AS publish
# RUN dotnet publish "Boilerplate.Api.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# USER $APP_UID 
# ENTRYPOINT ["dotnet", "Boilerplate.Api.dll"]