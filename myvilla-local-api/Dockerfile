FROM node:16.17.0-alpine as builder

ENV NODE_ENV build

# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app
RUN mkdir /app
WORKDIR /app

COPY . ./

RUN npm install 
RUN npm run build


# WORKDIR /app/dist


FROM node:16.17.0-alpine

ENV NODE_ENV deployment

# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app
RUN mkdir /app
WORKDIR /app

COPY --from=builder  /app/package*.json ./
COPY --from=builder  /app/node_modules/ ./node_modules/
COPY --from=builder  /app/dist/ ./dist/

WORKDIR /app/dist

# ENV TZ=Asia/Bangkok
# ENV NODE_ENV=production
# ENV APP_PORT=4090
# ENV DB_HOST=local.uat.bannayuu.com
# ENV DB_PORT=5432
# ENV DB_NAME=cit_bannayuu_db
# ENV DB_USERNAME=cit
# ENV DB_PASSWORD=db13apr
# ENV IMAGE_PATH_WEB=C:\\Bannayuu\\Web\\Image\\files
# ENV IMAGE_PATH_VISITOR=C:\\Bannayuu\\Visitor\\Image\\files
# ENV MYCOMPANY_ID=1
# ENV IMAGE_SIZE_MB=10
# ENV URL_CALCULATE=http://localhost:4060/api/bannayuu/calculate/cal-all
# ENV HOST_LINE_NOTIFICATION=https://cit.bannayuu.com/apicross/webhook
# ENV PATH_LINE_ACTION_IN_NOTIFICATION=/push_noti_home_line
# ENV HOST_LINE_NOTIFICATION_BOARDCAST=hhttps://cit.bannayuu.com/apinotify/line_notify
# ENV PATH_LINE_ACTION_IN_NOTIFICATION_BOARDCAST=/push_notify_home_line
# ENV BASIC_AUTH_USERNAME=bannayuu
# ENV BASIC_AUTH_PASSWORD=bannayuu@pass
# ENV TOKEN_AUTHENTICATION=5330531265f44e00bffdd12aa1e3e3a0

CMD ["node", "bannayuu-local-api.js"]

