help:
	@echo targets are: build run clean help

build:
	docker build -t airbnbanalyzer .

run:
	docker run -it -p 5000:5000 --name airbnb_analyzer airbnbanalyzer

clean:
	docker rm -f airbnb_analyzer


