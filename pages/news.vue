<template>
  <div>
    <Head>
      <Title>Buffalo Rugby Club News</Title>
    </Head>
    <Common-header title="Current News" />

    <div class="my-simple-card-style">
      <div
        class="flex flex-column md:flex-row flex-wrap align-items-center md:align-items-start justify-content-center gap-2"
      >
        <div class="flex justify-content-center">
          <display-adjacent-games direction="Last" />
        </div>
        <div class="flex justify-content-center">
          <display-adjacent-games direction="Next" />
        </div>
      </div>

      <div
        class="flex flex-column md:flex-row flex-wrap align-items-center md:align-items-start justify-content-center gap-2"
      >
        <div class="flex justify-content-center">
          <div>
            <div class="my-header-style">Latest on Facebook</div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBuffaloRugbyClub%2F&tabs=timeline&width=340&height=400&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
              width="340"
              height="400"
              style="border: none; overflow: hidden"
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              allow="encrypted-media"
            />
          </div>
        </div>
        <div class="flex justify-content-center">
          <div>
            <div class="my-header-style">Latest on Instagram</div>
            <blockquote
              class="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/buffalorugbyclub/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style="
                background: #fff;
                border: 0;
                border-radius: 3px;
                box-shadow:
                  0 0 1px 0 rgba(0, 0, 0, 0.5),
                  0 1px 10px 0 rgba(0, 0, 0, 0.15);
                margin: 1px;
                max-width: 540px;
                min-width: 326px;
                padding: 0;
                width: 99.375%;
                width: -webkit-calc(100% - 2px);
                width: calc(100% - 2px);
              "
            >
              <div style="padding: 16px">
                <a
                  href="https://www.instagram.com/buffalorugbyclub/?utm_source=ig_embed&amp;utm_campaign=loading"
                  style="
                    background: #ffffff;
                    line-height: 0;
                    padding: 0 0;
                    text-align: center;
                    text-decoration: none;
                    width: 100%;
                  "
                  target="_blank"
                >
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                    "
                  >
                    <div
                      style="
                        background-color: #f4f4f4;
                        border-radius: 50%;
                        flex-grow: 0;
                        height: 40px;
                        margin-right: 14px;
                        width: 40px;
                      "
                    ></div>
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                        justify-content: center;
                      "
                    >
                      <div
                        style="
                          background-color: #f4f4f4;
                          border-radius: 4px;
                          flex-grow: 0;
                          height: 14px;
                          margin-bottom: 6px;
                          width: 100px;
                        "
                      ></div>
                      <div
                        style="
                          background-color: #f4f4f4;
                          border-radius: 4px;
                          flex-grow: 0;
                          height: 14px;
                          width: 60px;
                        "
                      ></div>
                    </div>
                  </div>
                  <div style="padding: 19% 0"></div>

                  <div style="padding-top: 8px">
                    <div
                      style="
                        color: #3897f0;
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 550;
                        line-height: 18px;
                      "
                    >
                      View this profile on Instagram
                    </div>
                  </div>
                  <div style="padding: 12.5% 0"></div>
                  <div
                    style="
                      display: flex;
                      flex-direction: row;
                      margin-bottom: 14px;
                      align-items: center;
                    "
                  >
                    <div>
                      <div
                        style="
                          background-color: #f4f4f4;
                          border-radius: 50%;
                          height: 12.5px;
                          width: 12.5px;
                          transform: translateX(0px) translateY(7px);
                        "
                      ></div>
                      <div
                        style="
                          background-color: #f4f4f4;
                          height: 12.5px;
                          transform: rotate(-45deg) translateX(3px)
                            translateY(1px);
                          width: 12.5px;
                          flex-grow: 0;
                          margin-right: 14px;
                          margin-left: 2px;
                        "
                      ></div>
                      <div
                        style="
                          background-color: #f4f4f4;
                          border-radius: 50%;
                          height: 12.5px;
                          width: 12.5px;
                          transform: translateX(9px) translateY(-18px);
                        "
                      ></div>
                    </div>
                    <div style="margin-left: 8px">
                      <div
                        style="
                          background-color: #f4f4f4;
                          border-radius: 50%;
                          flex-grow: 0;
                          height: 20px;
                          width: 20px;
                        "
                      ></div>
                      <div
                        style="
                          width: 0;
                          height: 0;
                          border-top: 2px solid transparent;
                          border-left: 6px solid #f4f4f4;
                          border-bottom: 2px solid transparent;
                          transform: translateX(16px) translateY(-4px)
                            rotate(30deg);
                        "
                      ></div>
                    </div>
                    <div style="margin-left: auto">
                      <div
                        style="
                          width: 0px;
                          border-top: 8px solid #f4f4f4;
                          border-right: 8px solid transparent;
                          transform: translateY(16px);
                        "
                      ></div>
                      <div
                        style="
                          background-color: #f4f4f4;
                          flex-grow: 0;
                          height: 12px;
                          width: 16px;
                          transform: translateY(-4px);
                        "
                      ></div>
                      <div
                        style="
                          width: 0;
                          height: 0;
                          border-top: 8px solid #f4f4f4;
                          border-left: 8px solid transparent;
                          transform: translateY(-4px) translateX(8px);
                        "
                      ></div>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      flex-grow: 1;
                      justify-content: center;
                      margin-bottom: 24px;
                    "
                  ></div>
                  <div
                    style="
                      background-color: #f4f4f4;
                      border-radius: 4px;
                      flex-grow: 0;
                      height: 14px;
                      margin-bottom: 6px;
                      width: 224px;
                    "
                  ></div>
                  <div
                    style="
                      background-color: #f4f4f4;
                      border-radius: 4px;
                      flex-grow: 0;
                      height: 14px;
                      width: 144px;
                    "
                  ></div>
                </a>
                <p
                  style="
                    color: #c9c8cd;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    line-height: 17px;
                    margin-bottom: 0;
                    margin-top: 8px;
                    overflow: hidden;
                    padding: 8px 0 7px;
                    text-align: center;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                >
                  <a
                    href="https://www.instagram.com/buffalorugbyclub/?utm_source=ig_embed&amp;utm_campaign=loading"
                    style="
                      color: #c9c8cd;
                      font-family: Arial, sans-serif;
                      font-size: 14px;
                      font-style: normal;
                      font-weight: normal;
                      line-height: 17px;
                    "
                    target="_blank"
                    >Buffalo Men&#39;s Rugby Club</a
                  >
                  (@<a
                    href="https://www.instagram.com/buffalorugbyclub/?utm_source=ig_embed&amp;utm_campaign=loading"
                    style="
                      color: #c9c8cd;
                      font-family: Arial, sans-serif;
                      font-size: 14px;
                      font-style: normal;
                      font-weight: normal;
                      line-height: 17px;
                    "
                    target="_blank"
                    >buffalorugbyclub</a
                  >) • Instagram photos and videos
                </p>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
      <div class="my-header-style">News Items</div>
      <div
        class="flex flex-column md:flex-row flex-wrap align-items-center md:align-items-start justify-content-center"
      >
        <Card
          v-for="item in news"
          :key="item.news_id"
          style="width: 320px"
          class="flex justify-content-center"
        >
          <template #title>
            <span class="text-sm">
              {{ $dayjs(item.dt).format('MMM D, YYYY') }} </span
            ><br />
            <span>
              {{ item.news_title }}
            </span>
          </template>
          <template #content>
            <p class="">{{ item.news_synop }}</p>
          </template>
          <template #footer>
            <a
              href="#"
              @click.prevent="openModal(item)"
              ><span class="m-2">Read More</span></a
            >
            <span class="text-xs text-600">{{ item.news_id }}</span>
          </template>
        </Card>
      </div>
    </div>
    <!-- Modal -->
    <Dialog
      v-model:visible="displayModal"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      :style="{ width: '60vw' }"
      :pt="{
        root: {
          style: {
            padding: '0',
            minWidth: '10rem',
            'border-radius': '20px',
          },
        },
        header: {
          style: {
            'background-color': '#CCC',
          },
        },
        content: {
          style: {
            padding: '1rem',
            'background-color': '#EEE',
          },
        },
        footer: {
          style: {
            'background-color': '#CCC',
            padding: '1rem',
          },
        },
      }"
    >
      <template #header>
        <div>
          <h5>{{ selectedItem.news_title }}</h5>
        </div>
      </template>
      <div v-html="selectedItem.news_article"></div>

      <template #footer>
        <div>
          <Button
            label="Return"
            class="p-button-sm"
            autofocus
            @click="closeModal"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  useHead({
    script: [{ src: '//www.instagram.com/embed.js' }],
  })

  const { $dayjs } = useNuxtApp()
  //
  // Dialog initialization - display news item
  //
  const selectedItem = ref({})
  const displayModal = ref(false)
  const openModal = (item) => {
    displayModal.value = true
    selectedItem.value = item
  }
  const closeModal = () => {
    displayModal.value = false
  }
  //
  // Get current news
  //
  const { data: news } = await useFetch('/news/getallcurrent', {
    method: 'get',
  })
</script>
