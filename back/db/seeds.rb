# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "jiuzhemedingle1346@gmail.com", name: "doi", password: "password")
5.times do |n|
  User.create(email: "test#{n+1}@exam.com", name: "TestUser#{n+1}", password: "password")
end

Post.create(
  [
    {user_id: 2, message: "今日も疲れたにゃ"},
    {user_id: 4, message: "これ以上は無理"}
  ]
)