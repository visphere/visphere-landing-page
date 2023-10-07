FROM node:18.16.0-alpine AS build

ARG BUILD_MODE

WORKDIR /visphere

COPY visphere-base visphere-base/
COPY visphere-landing-page visphere-landing-page/

WORKDIR /visphere/visphere-base

RUN yarn install

WORKDIR /visphere/visphere-landing-page

RUN mkdir dist

RUN yarn install
RUN yarn run docker:$BUILD_MODE

WORKDIR /visphere

RUN rm -rf visphere-base

FROM build AS prod-deps

WORKDIR /visphere/visphere-landing-page

RUN yarn install --prod

FROM node:18.16.0-alpine

LABEL maintainer="Visphere <info@visphere.pl>"

RUN mkdir -p vsph/dist
RUN mkdir -p vsph/node_modules

WORKDIR /vsph

COPY --from=prod-deps /visphere/visphere-landing-page/node_modules /vsph/node_modules
COPY --from=build /visphere/visphere-landing-page/dist/ /vsph/dist

COPY visphere-landing-page/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=80

EXPOSE 80
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
