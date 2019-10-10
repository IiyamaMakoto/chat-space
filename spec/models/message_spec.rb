require 'rails_helper'

describe Message do

  describe '#create' do

    context 'can save' do
      it "is valid with a message" do
        message = build(:message, image: "")
        message.valid?
        expect(message).to be_valid
      end

      it "is valid with an image" do
        message = build(:message, message: "")
        message.valid?
        expect(message).to be_valid
      end

      it "is valid with a message and an image" do
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without a message and an image" do
        message = build(:message, message: "", image: "")
        message.valid?
        expect(message.errors[:message]).to include("を入力してください")
      end

      it "is invalid without a group" do
        message = build(:message, group_id: "")
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without an user" do
        message = build(:message, user_id: "")
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end
