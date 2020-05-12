FROM ruby:2.6.5

RUN apt-get update -qq && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /app
ENV APP_ROOT /app
WORKDIR $APP_ROOT

ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

RUN bundle install
ADD . $APP_ROOT
