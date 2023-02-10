<script>
    import "../app.css";
    import Header from "../components/common/+header.svelte";
    import Alert from "../components/alert.svelte";
  </script>


  <Header />
  <div class="pl-10 pr-10">
    <Alert />
    <slot class="container mx-auto"/>
  </div>

  