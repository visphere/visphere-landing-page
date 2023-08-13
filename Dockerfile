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

FROM node:18.16.0-bullseye-slim

LABEL maintainer="MoonSphere Systems <info@moonsphere.pl>"

RUN mkdir -p msph-landing-page-content/dist
RUN mkdir -p msph-landing-page-content/node_modules

COPY --from=build /moonsphere/moonsphere-landing-page/package.json /msph-landing-page-content/package.json
COPY --from=build /moonsphere/moonsphere-landing-page/yarn.lock /msph-landing-page-content/yarn.lock
COPY --from=build /moonsphere/moonsphere-landing-page/dist/ /msph-landing-page-content/dist

WORKDIR /msph-landing-page-content

RUN yarn install --prod

COPY moonsphere-landing-page/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
