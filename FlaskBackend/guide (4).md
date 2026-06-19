FROM python:3.14.0-alpine3.22

# Prevent Python from writing pyc files and buffering output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /my_flask_app

RUN apk add --no-cache build-base mariadb-dev

COPY my_flask_app/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY my_flask_app/ .

EXPOSE 5000

# "app:app" = app.py file and Flask app instance named 'app'
#CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]
CMD /bin/sh -c "\
  echo 'Starting Gunicorn...'; \
  gunicorn --bind 0.0.0.0:5000 wsgi:app & \
  GUNICORN_PID=$!; \
  echo 'Waiting a few seconds for app to be ready...'; \
  sleep 5; \
  echo 'Seeding database via live app...'; \
  python -c 'import sys, importlib.util; sys.path.insert(0,\"/my_flask_app\"); \
  spec=importlib.util.spec_from_file_location(\"seed_db\", \"/my_flask_app/scripts/seed_db.py\"); \
  seed_module=importlib.util.module_from_spec(spec); spec.loader.exec_module(seed_module); seed_module.seed()'; \
  wait $GUNICORN_PID"