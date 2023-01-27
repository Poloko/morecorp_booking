# morecorp

Developed to create bookings.
I complete the tasks except the writing unit tests. We had 2 lauches at work and it was a crazy week. I hope what I have done is enough to show you what I am capable of. It you would like me to continue to write the unit tests, I can do the over the weekend if you let me know by today.

I hope it mets your expectations even though I wish I had time to do more. I have edit and delete function ready in the API but not using yet on the front end.

## Installation
Clone repo to you local
Open terminal and navigate to the api folder

Once there run

```bash
php artisan migrate
php artisan db:seed
php artisan serve
```
The api will now be running
Next navigate to the Frontend folder and run the following

```bash
npm install
docker build -f Dockerfile.dev -t morecorp:frontend .
docker run -p 3000:3000 -d morecorp:frontend
```

Now the frontent will be available at http://localhost:3000/

## License

[MIT](https://choosealicense.com/licenses/mit/)

Hope to hear from you!

