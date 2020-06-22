<template>
  <main class="listingPage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4">
          <!-- Sidebar -->
        </div>

        <!-- Main Content -->
        <div class="col-xl-10 col-lg-9 col-md-8 col-sm-8">
          <!-- Begin FeaturedProduct Component -->
          <FeaturedProduct />
          <!-- End FeaturedProduct Component -->

          <!-- Begin Main Results-->
          <div class="mainResults">
            <!-- Begin List Of Results -->
            <ul class="s-result-list">
              <!-- Begin li Result item -->
              <li v-for="product in products" :key="product._id" class="s-result-item celwidget">
                <!-- Begin item-container -->
                <div class="s-item-container">
                  <!-- Begin Best Seller -->
                  <div class="a-spacing-micro">
                    <div class="bestSeller">
                      <a href>Best Seller</a>
                    </div>
                  </div>
                  <!-- End Best Seller -->

                  <!-- Begin Out Row -->
                  <div>
                    <!-- Begin Row -->
                    <div class="row">
                      <!-- Image -->
                      <div class="col-sm-3 text-center">
                        <a href>
                          <img :src="product.photo" style="width:150px" class="img-fluid" alt />
                        </a>
                      </div>

                      <div class="col-sm-9">
                        <!-- Title And Date -->
                        <div class="a-row a-spacing-small">
                          <nuxt-link :to="`/products/${product._id}`" class="a-link-normal">
                            <h2 class="a-size-medium">
                              {{ product.title }}
                              <span class="a-letter-space"></span>
                              <span class="a-letter-space"></span>
                              <span class="a-size-small a-color-secondary">Feb, 3 2020</span>
                            </h2>
                          </nuxt-link>
                        </div>

                        <!-- Author's name -->
                        <div class="a-row a-spacing-small">
                          <span class="a-size-small a-color-secondary">by</span>
                          <span class="a-size-small a-color-secondary">
                            <a href="#" class="a-link-normal a-text-normal">{{ product.owner.name }}</a>
                          </span>
                        </div>

                        <!-- Shipment -->
                        <div class="a-row">
                          <span class="a-size-small">Ship to USA</span>
                        </div>

                        <!-- Hardcover -->
                        <div class="row">
                          <div class="col-sm-7">
                            <div class="a-row a-spacing-none">
                              <a href class="a-link-normal a-text-normal">Hardcover</a>
                            </div>

                            <!-- Price -->
                            <div class="a-row a-spacing-none">
                              <a href class="a-link-normal a-text-normal">
                                <span class="a-offscreen">${{product.price}}</span>
                                <span class="a-color-base sx-zero-spacing">
                                  <span class="sx-price sx-price-large">
                                    <sup class="sx-price-currency">$</sup>
                                    <span class="sx-price-whole">{{ product.price}}</span>
                                    <sup class="sx-price-fractional">00</sup>
                                  </span>&nbsp;&nbsp;
                                </span>
                              </a>
                              <span class="a-letter-apace"></span>
                              <template v-if="product.price>50">
                                <span
                                  class="a-size-base-plus a-color-secondary a-text-strike"
                                >{{(product.price*110)/100}}</span>
                              </template>
                              <template v-else>
                                <span
                                  class="a-size-base-plus a-color-secondary a-text-strike"
                                >{{(product.price*105)/100}}</span>
                              </template>
                            </div>

                            <!-- Audible Trial -->
                            <div class="a-row a-spacing-none">
                              <span class="a-size-small a-color-secondary">Free with Audible Trial</span>
                            </div>
                            <hr />

                            <!-- Other Formats -->
                            <span class="a-size-small a-color-secondary">
                              Other Formats:
                              <span class="a-letter-space"></span>
                              <a class="a-size-small a-link-normal a-text-normal">Audio CD</a>
                            </span>
                          </div>

                          <!-- Ratings -->
                          <div class="col-sm-5">
                            <div class="a-row a-spacing-mini">
                              <!-- Star Ratings -->
                              <client-only>
                                <star-rating
                                  :rating="product.averageRating"
                                  :show-rating="false"
                                  v-bind:increment="0.5"
                                  :glow="1"
                                  :border-width="1"
                                  :rounded-corners="true"
                                  :read-only="true"
                                  :star-size="18"
                                ></star-rating>
                              </client-only>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End Row -->
                  </div>
                  <!-- End Out Row -->
                </div>
                <!-- End item-container -->
              </li>
              <!-- End li Result item -->
            </ul>
            <!-- End List Of Results -->
          </div>
          <!-- End Main Results-->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import StarRating from "vue-star-rating";
import FeaturedProduct from "~/components/FeaturedProduct";

export default {
  components: {
    StarRating,
    FeaturedProduct
  },
  // Get Data From products
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get(
        `${process.env.BASE_URL || `http://localhost:3000`}/api/products`
      );

      return {
        products: response.products
      };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>