{{#each headers}}
  <div class="accordion-hd" data-role="trigger">
    <i data-role="flag" class="icon-tool-plus"></i>
    <i class="icon" style="background:url('{{this.icon}}')"></i>
    <span>{{this.name}}</span>
  </div>
  <div class="accordion-bd" data-role="panel"></div>
{{/each}}
