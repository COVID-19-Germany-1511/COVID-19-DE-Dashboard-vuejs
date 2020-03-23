import { Component, Vue, Prop, Model } from 'vue-property-decorator';

@Component
export default class InputMixin extends Vue {
  @Model('change')
  protected readonly value!: any;

  @Prop({ type: String, required: true })
  protected readonly name!: string;

  @Prop({ type: Boolean, default: false })
  protected readonly isReadonly!: boolean;

  get inputListeners() {
    return Object.assign({}, this.$listeners, {
      input: this.sendInput.bind(this),
      change: this.sendInput.bind(this),
    });
  }

  sendInput(event: any) {
    const value = event.target.value;
    this.$emit('change', value);
    this.$emit('input', value);
  }
}
