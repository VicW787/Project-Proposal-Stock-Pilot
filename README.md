# Stock Pilot

Stock Pilot is a simple inventory app for small businesses. It helps a shop owner keep track of their products, see what is running low and record sales.

## What It Does

1) Dashboard - shows the total number of products, the total value of the inventory, how many items are low on stock, and the total number of sales.

2) Products Page - Shows all the products in a table. You can add a new product, edit a product or delete a product. There is also a search bar to find products by name or category.

3) Low Stock Warning - any product with less than 10 items gets a red "Low" tag so you know it's time to restock.

4) Sales Page - you pick a product and a quantity to record a sale. The app takes sold items out of the stock automatically. If you try to sell more than you have, the response is, "There isn't enough stock".

5) Sales History - a list of all the sales you have made, with the newest ones at the top. You can delete a sale too.

## Tools Used

- React
- Vite
- React Router (For moving between pages)
- Tailwind CSS (for styling)
- JSON Server (as a fake backend that saves the data in 'db.json')

## How to Run it

You need to have the following installations in your computer:
(a) Node.js
(b) Npm

### Here are the steps

1.) Clone the repository.
2.) Go to the project folder.
3.) Install the packages.
>>npm install
4.) Start the JSON Server (this is the backend, it runs on port 3000)
>>npm run server
5.) Open a second terminal and start the app:
>>npm run dev
6.) Open the link Displayed by Vite usually 'http://localhost:5173'.

### Point to note

Make sure both terminals are running.

## Things to Add later

(a)A login so each business has its own account.
(b)Charts on the dashboard to show sales over time.
(c)Letting the user choose their own "low stock" number instead of the default 10. 