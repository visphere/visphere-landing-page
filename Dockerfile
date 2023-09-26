FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /moonsphere

COPY moonsphere-base moonsphere-base/
COPY moonsphere-landing-page moonsphere-landing-page/

WORKDIR /moonsphere/moonsphere-base

RUN yarn install

WORKDIR /moonsphere/moonsphere-landing-page

RUN mkdir dist

RUN yarn install
RUN yarn run docker:$BUILD_MODE

WORKDIR /moonsphere

RUN rm -rf moonsphere-base

FROM build AS prod-deps

WORKDIR /moonsphere/moonsphere-landing-page

RUN yarn install --prod

FROM node:18.16.0-alpine

LABEL maintainer="MoonSphere Systems <info@moonsphere.pl>"

RUN mkdir -p msph/dist
RUN mkdir -p msph/node_modules

WORKDIR /msph

COPY --from=prod-deps /moonsphere/moonsphere-landing-page/node_modules /msph/node_modules
COPY --from=build /moonsphere/moonsphere-landing-page/dist/ /msph/dist

COPY moonsphere-landing-page/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
