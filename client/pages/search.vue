<template>
  <main class="listingPage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4">
          <!-- Sidebar -->
        </div>

        <!-- Main Content -->
        <div class="col-xl-10 col-lg-9 col-md-8 col-sm-8">
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
                              <span class="a-size-base-plus a-color-secondary a-text-strike">$28.00</span>
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
                                  :glow="1"
                                  :border-width="1"
                                  :rounded-corners="true"
                                  :read-only="true"
                                  :star-size="18"
                                ></star-rating>
                                <!-- :star-points="[12,2,14,17,0,19,10,34,7,50,23,43,38,50,36,34,46,19,31,17]" -->
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
export default {
  components: {
    StarRating
  },
  watchQuery: ["title"],
  async asyncData({ $axios, query }) {
    try {
      let products = await $axios.$post("/api/search", { title: query.title });
      console.log(products);
      return {
        products
      };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
