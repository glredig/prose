class Article < ActiveRecord::Base
  mount_uploader :article_image, ArticleImageUploader
  
  scope :science, -> { where(category: 0) }
  scope :social, -> { where(category: 1) }
  scope :featured, -> { where(featured: true) }

  CATEGORIES = [
    "Science",
    "Social"
  ]

end