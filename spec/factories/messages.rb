FactoryBot.define do
  factory :message do
    message     {Faker::Lorem.sentence}
    image       {File.open("#{Rails.root}/spec/fixtures/cat1.png")}
    user
    group
  end
end