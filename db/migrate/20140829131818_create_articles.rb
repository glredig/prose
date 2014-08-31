class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :short_title
      t.boolean :featured, default: false
      t.string :link
      t.integer :category

      t.timestamps
    end
  end
end
