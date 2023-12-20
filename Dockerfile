FROM python:3.8

LABEL maintainer="charugunjan88@gmail.com"

WORKDIR /app

COPY . /app

RUN pip install flask gunicorn

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 8009

ENV NAME World


CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8009", "run:app"]
