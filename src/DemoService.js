class DemoService {
  async getData() {
    const req = await fetch('https://api.lemonilo.com/v1/health');
    const json = await req.json();
    return json;
  }
}

export default DemoService;
