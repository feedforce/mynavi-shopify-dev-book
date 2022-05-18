require 'openssl'
require 'rack/utils'

# アプリの API secret
secret = 'my_api_secret_key'

# リクエストで受け付けたクエリパラメータ
query_string = 'extra=1&extra=2&shop=shop-name.myshopify.com&path_prefix=%2Fapps%2Fawesome_reviews&timestamp=1317327555&signature=a9718877bea71c2484f91608a7eaea1532bdf71f5c56825065fa4ccabe549ef3'

# 文字列のクエリパラメータを Hash オブジェクトに変換する
query_hash = Rack::Utils.parse_query(query_string)
# => {
#   "extra" => ["1", "2"],
#   "shop" => "shop-name.myshopify.com",
#   "path_prefix" => "/apps/awesome_reviews",
#   "timestamp" => "1317327555",
#   "signature" => "a9718877bea71c2484f91608a7eaea1532bdf71f5c56825065fa4ccabe549ef3",
# }

#  "signature" をクエリパラメータから削除し、変数に代入する
signature = query_hash.delete('signature')

# クエリパラメータを key 名でソートし、 Hash オブジェクトから文字列に戻す
sorted_params = query_hash.collect { |k, v| "#{k}=#{Array(v).join(',')}" }.sort.join
# => "extra=1,2path_prefix=/apps/awesome_reviewsshop=shop-name.myshopify.comtimestamp=1317327555"

# ハッシュ関数 SHA256 を使ってクエリパラメータと secret で署名を作成する
digest = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), secret, sorted_params)

# クエリパラメータに含まれていた署名と一致することを確認する
ActiveSupport::SecurityUtils.secure_compare(digest, signature)
